import { firestore, postToJSON } from "../../lib/firebase"
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";
import { Box, Button, Container, Grid, Switch, TextareaAutosize, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";


export default function Index() {
    const [textValue, setTextValue] = useState("text")

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
            // setOutput(JSON.stringify(doc.data()))
            console.log(JSON.stringify(doc.data()))
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleValueChange = (event: MouseEvent) => {
        setTextValue(event.target.value)
    }

    return (
        <Grid
            container
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mt={5}
            p={10}
        >

        </Grid>
    )
}
