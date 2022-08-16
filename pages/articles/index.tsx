import { firestore, postToJSON } from "../../lib/firebase"
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";
import { Box, Button, Container, Grid, Switch, TextareaAutosize, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";


export default function Index() {
    const [output, setOutput] = useState("");
    const [textValue, setTextValue] = useState("text")
    const [textEditable, setTextEditable] = useState(false)

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

    const handleValueChange = (event: FormEvent<HTMLDivElement>) => {
        setTextValue(event.target.value)
    }

    const handleEditModeClick = (event: MouseEvent) => {
        setTextEditable((prev) => !prev)
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
            {/* <Button onClick={handleClick} variant="contained">Test add Doc</Button>
            <Typography variant='body1'>{output}</Typography> */}
            {/* <TextareaAutosize
                aria-label="empty textarea"
                placeholder=""
                style={{ width: '40%', height: '200px' }}
                onChange={handleValueChange}
                value={textValue}
            /> */}
            <Switch onClick={handleEditModeClick}></Switch>
            <Box
                border='Highlight'
                bgcolor='lightblue'
                minHeight='30vh'
                minWidth='40%'
                p={1}
            >
                <div
                    contentEditable={textEditable}
                    onChange={handleValueChange}
                    dangerouslySetInnerHTML={{ __html: textValue }}
                    style={{
                        background: textEditable ? 'white' : '',
                        borderRadius: 3
                    }}
                >
                </div>
            </Box>

        </Grid>
    )
}
