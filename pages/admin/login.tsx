import { Backdrop, Box, Button, Card, CardContent, CircularProgress, Grid, Link, Paper, SvgIcon, TextField, Typography } from "@mui/material"
import { getAuth, signInWithPopup, GoogleAuthProvider, AuthProvider, FacebookAuthProvider, OAuthProvider } from "firebase/auth"
import { AuthError } from 'firebase/auth'
import { ChangeEvent, MouseEvent, useCallback, useContext, useState } from "react"
import GoogleIcon from "../../components/icons/GoogleIcon"
import { userContext } from "../../lib/context"
import debounce from 'lodash.debounce'
import FacebookIcon from "../../components/icons/FacebookIcon"
import MicrosoftIcon from "../../components/icons/MicrosoftIcon"
import Router from 'next/router'

const googleProvider = new GoogleAuthProvider()
const microsoftProvider = new OAuthProvider('microsoft.com')
const facebookProvider = new FacebookAuthProvider()

export default function Login() {
    const auth = getAuth()

    return (
        <>
            {
                auth.currentUser ? <AlreadySignedIn /> : <SigninBoxes />
            }
        </>
    )
}

const AlreadySignedIn = () => {
    const auth = getAuth()
    const [signingOut, setSigningOut] = useState(false)

    const handleSignout = async () => {
        setSigningOut(true)
        await auth.signOut()
        // Router.push('/')
    }

    return (
        <>
            <Grid
                container
                flexDirection='column'
                alignItems='center'
                p='4em 0 4em 0'
                gap={3}
            >
                <Typography variant='h5'>You are currently signed in as</Typography>
                <Card variant="outlined">
                    <CardContent>
                        <Typography fontWeight="bold">{auth.currentUser?.displayName}</Typography>
                        <Typography>{auth.currentUser?.email}</Typography>
                    </CardContent>
                </Card>
                <Button
                    variant="outlined"
                    onClick={handleSignout}
                >
                    Signout
                </Button>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={signingOut}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

const SigninBoxes = () => {
    const auth = getAuth()

    const handleSigninClick = (provider: AuthProvider) => {
        signInWithPopup(auth, provider).catch(error => {
            console.log(error.code)
        })
        // Router.push('/')
    }

    return (
        <Box
            display='flex'
            flexDirection='row'
        >
            <Box

            >
                {' '}
            </Box>
            <Grid
                container
                flexDirection='column'
                alignItems='center'
                p='4em 0 4em 0'
                gap={3}
            >
                <Typography variant='h4'>Signin</Typography>
                <Button
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    onClick={() => handleSigninClick(googleProvider)}
                >
                    Google
                </Button>
                <Button
                    variant="contained"
                    startIcon={<FacebookIcon />}
                    onClick={() => handleSigninClick(facebookProvider)}
                >
                    Facebook
                </Button>
                <Button
                    variant="contained"
                    startIcon={<MicrosoftIcon />}
                    onClick={() => handleSigninClick(microsoftProvider)}
                >
                    Microsoft
                </Button>
                <Typography>Don&apos;t have an account? <Link href="/admin/signup" sx={{textDecoration: 'none'}}>Signup!</Link></Typography>
            </Grid>
            <Box

            >
                
            </Box>
        </Box>
    )
}
