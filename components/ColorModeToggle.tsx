import { CircularProgress, Grid, Paper, Switch, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../lib/theme";
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from "next/link";

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
                <Link href="/admin/login">
                    <CurrentUser />
                </Link>
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
        return (
            <Typography variant="body1" p={1}>error: {error.message}</Typography>
        );
    }
    if (user) {
        return (
            <Typography variant="body1" p={1}>{user.displayName}</Typography>
        );
    }
    return <Typography variant="body1" p={1}>Not Signed In</Typography>
};