import { CircularProgress, Grid, Paper, Switch, Typography, useTheme, Link } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../lib/theme";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function ColorModeToggle() {
    const { toggleColorMode } = useContext(ColorModeContext);

    return (
        <Grid
            container
            flexDirection="row"
            position="fixed"
            p={0.6}
            pr={2}
            alignItems="center"
            justifyContent="flex-end"
        >
            <Paper elevation={3}>
                <Typography p={1}>
                    <CurrentUser />
                </Typography>
            </Paper>
            <Switch onChange={toggleColorMode}></Switch>
            <Typography>Color Mode</Typography>
        </Grid>
    )
}

const CurrentUser = () => {
    const auth = getAuth()
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return (
            <CircularProgress />
        );
    }
    if (error) {
        return <Link href="/admin/login" sx={{textDecoration: 'none'}}>error: {error.message}</Link>
    }
    if (user) {
        return <Link href="/admin/login" sx={{textDecoration: 'none'}}>{user.displayName}</Link>
    }
    return <Link href="/admin/login" sx={{textDecoration: 'none'}}>Sign in</Link>
};