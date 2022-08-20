import { doc, onSnapshot, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

/**
 * Custom hook to read auth record and user profile doc.
 * 
 * @returns user doc and username of user
 */
export function useUserData() {
    const [user] = useAuthState(auth);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe;

        if (user) {
            const ref = doc(getFirestore(), 'users', user.uid);
            unsubscribe = onSnapshot(ref, (doc) => {
                setEmail(doc.data()?.email);
            });
        } else {
            setEmail(null);
        }

        return unsubscribe;
    }, [user]);

    return { user, email: email };
}