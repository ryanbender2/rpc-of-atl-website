import { Alert, Box, Button, Card, CardActions, CardContent, CircularProgress, Divider, Drawer, Fade, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Popper, PopperPlacementType, Skeleton, Snackbar, Stack, Typography, useTheme } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { addNewSignupCodeForUser, generateSignupCode, getSignupCodesForUser, SignupCode } from "../../lib/signupCodes";
import useSWR, { Fetcher } from 'swr'
import { toast } from "react-toastify";
import CreateNewSignupCodeModal from "../CreateNewSignupCodeModal";


const fetcher: Fetcher<SignupCode[], string> = (userUid: string) => getSignupCodesForUser(userUid).then(data => data)

export default function UserSignupCodesTab() {
    const auth = getAuth()
    const { data, mutate } = useSWR<SignupCode[]>(auth.currentUser?.uid, fetcher)
    const [createCodeModalOpen, setCreateCodeModalOpen] = useState(false)

    const openCreateCodeForm = () => {
        setCreateCodeModalOpen(true)
    }

    const handleCloseCreateCodeForm = async () => {
        await mutate()
        setCreateCodeModalOpen(false)
    }

    return (
        <Grid
            container
            pl={{ xs: 0, sm: '2%', md: '4%', lg: '8%', xl: '10%' }}
            pr={{ xs: 0, sm: '2%', md: '4%', lg: '8%', xl: '10%' }}
            pt={2}
            columns={1}
        >
            <Grid item xs={1}>
                <Typography variant='h4'>User Signup Codes</Typography>
            </Grid>
            <Grid item xs={1} pt={1} pb={1}>
                <Divider />
            </Grid>
            <Grid item xs={1}>
                <Grid
                    container
                    columns={2}
                >
                    <Grid item xs={1}>
                        <Box width='100%' display='flex' justifyContent='flex-end' pb={1}>
                            <Button
                                variant='contained'
                                onClick={openCreateCodeForm}
                            >
                                new
                            </Button>
                        </Box>
                        <SignupCodesList signupCodes={data} />
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
            </Grid>
            <CreateNewSignupCodeModal open={createCodeModalOpen} handleClose={handleCloseCreateCodeForm} />
        </Grid>
    )
}


const SignupCodesList = ({ signupCodes }: { signupCodes: SignupCode[] | undefined }) => {
    if (!signupCodes)
        return (
            <Stack spacing={1.5} p={1}>
                <Stack spacing={0.5}>
                    <Skeleton variant="rectangular" width={400} height={40} />
                    <Skeleton variant="rectangular" width={400} height={17} />
                    <Skeleton variant="rectangular" width={300} height={14} />
                </Stack>
                <Stack spacing={0.5}>
                    <Skeleton variant="rectangular" width={400} height={40} />
                    <Skeleton variant="rectangular" width={400} height={17} />
                    <Skeleton variant="rectangular" width={300} height={14} />
                </Stack>
                <Stack spacing={0.5}>
                    <Skeleton variant="rectangular" width={400} height={40} />
                    <Skeleton variant="rectangular" width={400} height={17} />
                    <Skeleton variant="rectangular" width={300} height={14} />
                </Stack>
                <Stack spacing={0.5}>
                    <Skeleton variant="rectangular" width={400} height={40} />
                    <Skeleton variant="rectangular" width={400} height={17} />
                    <Skeleton variant="rectangular" width={300} height={14} />
                </Stack>
            </Stack>
        )

    return (
        <Grid
            container
            columns={1}
            spacing={1}
            pb={4}
        >
            {signupCodes.sort((a, b) => b.dateCreated - a.dateCreated).map(code => <Grid key={code.code} item xs={1}><SignupCodeItem code={code} /></Grid>)}
        </Grid>
    )
}

const capital = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)

const SignupCodeItem = ({ code }: { code: SignupCode }) => {
    const theme = useTheme()

    const successColor = theme.palette.mode === 'dark' ? "success.dark" : "success.light"
    const unusedColor = theme.palette.mode === 'dark' ? "grey.800" : "grey.100"

    const unusedText = code.used ? 'Used' : 'Unused'
    const unusedTextColor = code.used ? successColor : unusedColor

    const [copiedSnackBarOpen, setCopiedSnackBarOpen] = useState(false)

    const handleSignupCodeClick = async (code: string) => {
        await navigator.clipboard.writeText(code)
        setCopiedSnackBarOpen(true)
    };

    const handleCodeSnackBarClose = () => {
        setCopiedSnackBarOpen(false)
    }

    return (
        <Card raised>
            <Grid
                container
                columns={16}
                alignItems='center'
            >
                <Grid item xs={7}>
                    <CardContent sx={{ p: 1 }}>
                        <Box display="flex" gap={1}>
                            <Typography color="text.secondary">Code for</Typography>
                            <Paper elevation={1}>
                                <Typography pr={0.5} pl={0.5}>
                                    {capital(code.firstName)} {capital(code.lastName)}
                                </Typography>
                            </Paper>
                        </Box>
                        <Snackbar
                            open={copiedSnackBarOpen}
                            onClose={handleCodeSnackBarClose}
                            autoHideDuration={4000}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        >
                            <Alert onClose={handleCodeSnackBarClose} severity='info'>
                                Code copied!
                            </Alert>
                        </Snackbar>
                        <Typography variant="h5" sx={{ cursor: 'pointer' }} onClick={() => handleSignupCodeClick(code.code)}>
                            {code.code}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={6}>
                    <CardContent>
                        <Typography color="text.secondary">Date Created</Typography>
                        <Typography>{new Date(code.dateCreated).toLocaleString()}</Typography>
                    </CardContent>
                </Grid>
                <Grid item xs>
                    <CardContent>
                        <Typography color="text.secondary" textAlign='center'>Status</Typography>
                        <Paper sx={{ bgcolor: unusedTextColor, textAlign: "center" }} elevation={2}>
                            <Typography>{unusedText}</Typography>
                        </Paper>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    )
}