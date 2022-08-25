import { Grid, useTheme } from "@mui/material";
import { getAuth } from "firebase/auth";
import AdminFab from "./AdminFab";

export default function Footer() {
    const auth = getAuth()

    return (
        <Grid
            container
            bgcolor='#1d1d1d'
            color='white'
            minHeight='325px'
            columns={12}
        >
            <Grid item xs={4}>

            </Grid>
            <Grid item xs={4}>


            </Grid>
            <Grid item xs={4}>
                <Grid
                    container
                    justifyContent='end'
                    alignItems='flex-end'
                    height='100%'
                    p={1}
                >
                    { auth.currentUser && <AdminFab /> }
                </Grid>
            </Grid>
        </Grid>
    )
}
