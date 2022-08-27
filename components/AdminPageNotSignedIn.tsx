import { Button, Divider, Grid, Typography } from "@mui/material";
import Router from "next/router";
import LoginIcon from '@mui/icons-material/Login';

export default function AdminPageNotSignedIn() {
    const onSignInButtonClick = () => {
        Router.push('/admin/login')
    }

    return (
        <Grid
            container
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            gap={3}
            height='100%'
        >
                <Typography variant='h3'>{"Hmm, It looks like you're not signed in."}</Typography>
                <Typography variant='h5'>{"If you're looking for the admin portal, you're in the right place. If not, how did you get here?"}</Typography>
                <Button
                    size="large"
                    onClick={onSignInButtonClick}
                    startIcon={<LoginIcon />}
                >
                    Sign in
                </Button>
        </Grid>
    )
}
