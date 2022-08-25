import { initializeApp, getApp, FirebaseApp, FirebaseError, FirebaseOptions } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, where, getDocs, query, limit, DocumentSnapshot, connectFirestoreEmulator, doc, getDoc, Firestore, addDoc, setDoc } from "firebase/firestore";
import { Auth, AuthProvider, connectAuthEmulator, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyD9sM92PbJEXu0JyPbrN17KsNpOYbEZLtw",
    authDomain: "rpc-of-atlanta.firebaseapp.com",
    projectId: "rpc-of-atlanta",
    storageBucket: "rpc-of-atlanta.appspot.com",
    messagingSenderId: "1092564523571",
    appId: "1:1092564523571:web:3d7c4ae4c58a03afe7e146",
    measurementId: "G-9ZC8X1P4GY"
};

function createFirebaseApp(config: FirebaseOptions): FirebaseApp {
    try {
        return getApp();
    } catch {
        var firebaseApp = initializeApp(config);
        if (process.env.NODE_ENV === 'development') {
            connectAuthEmulator(getAuth(firebaseApp), 'http://localhost:9099', { disableWarnings: true })
            connectFirestoreEmulator(getFirestore(firebaseApp), 'localhost', 8080);
        }
        return firebaseApp;
    }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

// Analytics export
// export const analytics = getAnalytics(firebaseApp);

// Auth exports
export const auth = getAuth(firebaseApp);

// Firestore export
export const firestore = getFirestore(firebaseApp);

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc: DocumentSnapshot) {
    const data = doc.data();
    return {
        ...data,
        // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
        createdAt: data?.createdAt.toMillis() || 0,
        updatedAt: data?.updatedAt.toMillis() || 0,
    };
}

/**`
 * Gets a users/{uid} document
 * @param  {string} userId
 */
export async function getUser(userId: string) {
    const q = query(
        collection(getFirestore(firebaseApp), 'users'),
        limit(1)
    )
    var queryDocs = (await getDocs(q)).docs;
    return queryDocs && queryDocs.length > 0 ? queryDocs[0] : null;
}

export function signInPopup(provider: AuthProvider) {
    signInWithPopup(auth, provider).catch(err => {
        console.log(err.code)
    })
}

export async function genSignupCodeForUser(firstName: string, lastName: string): Promise<string> {
    const signupCode = crypto.randomUUID().split('-').slice(0, 3).join('')
    await setDoc(doc(firestore, 'signupCodes', signupCode), {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        used: false
    })
    return signupCode
}

export async function setSignupCodeUsed(signupCode: string): Promise<boolean> {
    const docRef = doc(firestore, 'signupCodes', signupCode)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists())
        return false
    
    await setDoc(docRef, {
        ...docSnap.data(),
        used: true
    })

    return true
}