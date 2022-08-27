import { Box, Button, Card, CardActions, CardContent, CircularProgress, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { addNewSignupCodeForUser, generateSignupCode, getSignupCodesForUser, SignupCode } from "../../lib/signupCodes";
import useSWR, { Fetcher } from 'swr'


const fetcher: Fetcher<SignupCode[], string> = (userUid: string) => getSignupCodesForUser(userUid).then(data => data)

export default function UserSignupCodesTab() {
    const auth = getAuth()
    const { data } = useSWR<SignupCode[]>(auth.currentUser?.uid, fetcher)

    const handleClick = async () => {
        const code = generateSignupCode('ryan', 'bender')
        await addNewSignupCodeForUser(auth.currentUser?.uid, code)
    }

    console.log(data !== undefined)

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
                        <SignupCodesList signupCodes={data} />
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
            </Grid>
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
        >
            {signupCodes.map(code => <Grid item xs={1}><SignupCodeItem key={code.code} code={code} /></Grid>)}
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
                        <Typography variant="h5">
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

// <Typography sx={{ mb: 1.5 }} color="text.secondary">
// adjective
// </Typography>
// <Typography variant="body2">
// well meaning and kindly.
// <br />
// {'"a benevolent smile"'}
// </Typography>
{/* <CardActions>
<Button size="small">Learn More</Button>
</CardActions> */}