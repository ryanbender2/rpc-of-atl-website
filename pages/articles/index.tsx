import { firestore, postToJSON } from "../../lib/firebase"
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";
import { Button, Container, Typography } from "@mui/material";
import { MouseEvent, useState } from "react";


export default function Index() {
    const [output, setOutput] = useState("");

    const handleClick = async (event: MouseEvent) => {
        try {
            const usersCollection = collection(firestore, "users")
            const users = await getDocs(usersCollection)

            users.forEach(user => {
                console.table(user)
            })
            
            
            const docRef = await addDoc(collection(firestore, "users"), {
                first: "Ada",
                last: "Lovelace",
                born: 1815
            });
            const doc = await getDoc(docRef)
            setOutput(JSON.stringify(doc.data()))
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <Container

        >
            <Button onClick={handleClick} variant="contained">Test add Doc</Button>
            <Typography variant='body1'>{output}</Typography>
        </Container>
    )
}
