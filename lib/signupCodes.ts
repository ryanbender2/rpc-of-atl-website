import { collection, where, getDocs, query, limit, DocumentSnapshot, connectFirestoreEmulator, doc, getDoc, Firestore, addDoc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase";


export interface SignupCode {
    firstName: string;
    lastName: string;
    code: string;
    used: boolean;
    dateCreated: number;
    dateUsed: number | null;
}

// await setDoc(doc(firestore, 'signupCodes', signupCode), {
//     firstName: firstName.toLowerCase(),
//     lastName: lastName.toLowerCase(),
//     used: false
// })

export function generateSignupCode(firstName: string, lastName: string): SignupCode {
    const signupCode = crypto.randomUUID().split('-').slice(0, 3).join('')
    return {
        firstName: firstName.toLocaleLowerCase(),
        lastName: lastName.toLocaleLowerCase(),
        code: signupCode,
        used: false,
        dateCreated: Date.now(),
        dateUsed: null
    }
}

export async function addNewSignupCodeForUser(userUid: string, signupCode: SignupCode) {
    const docRef = doc(firestore, `users/${userUid}/signupCodes/${signupCode.code}`)
    await setDoc(docRef, signupCode)
}

export async function getSignupCodesForUser(userUid: string): Promise<Array<SignupCode>> {
    const querySnapshot = await getDocs(collection(firestore, `users/${userUid}/signupCodes`));
    const docs: any = querySnapshot.docs.map(doc => doc.data())
    return docs
}