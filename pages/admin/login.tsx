import { Box, Button, Grid, SvgIcon, TextField, Typography } from "@mui/material"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useContext } from "react"
import GoogleIcon from "../../components/GoogleIcon"
import { userContext } from "../../lib/context"

export default function Login() {
    const auth = getAuth()
    const user = useContext(userContext)

    return (
        <Grid
            container
            flexDirection='column'
            alignItems='center'
            p='4em 0 4em 0'
            gap={3}
        >
            <Typography variant='h4'>Login</Typography>
            <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
            />
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
            />
            <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{
                    mt: 3,
                }}
            >
                Signin with Google
            </Button>
        </Grid>
    )
}
