import { Box, Button, CircularProgress, Grid, Modal, TextField, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { addNewSignupCodeForUser, generateSignupCode } from "../lib/signupCodes";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


export default function CreateNewSignupCodeModal({ open, handleClose }: { open: boolean, handleClose: () => void }) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = getAuth()

    const handleFormSubmit = async () => {
        if (!auth.currentUser) return
        setLoading(true)
        const code = generateSignupCode(firstName, lastName)
        await addNewSignupCodeForUser(auth.currentUser?.uid, code)
        handleClose()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" pb={0.5}>
                    Create Signup Code
                </Typography>
                <Grid
                    container
                    columns={1}
                    spacing={1}
                >
                    <Grid item xs={1}>
                        <TextField
                            label="First Name"
                            variant="standard"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            label="Last Name"
                            variant="standard"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Box pt={2}>
                            <Button
                                variant="outlined"
                                size='small'
                                onClick={handleFormSubmit}
                            >
                                {loading ? <CircularProgress size={23} /> : 'create'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>


            </Box>
        </Modal>
    )
}
