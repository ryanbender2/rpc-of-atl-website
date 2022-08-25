import { Divider, Grid, Typography } from "@mui/material";

export default function AccountTab() {
    return (
        <Grid
            container
            pl={{ xs: 0, sm: '2%', md: '4%', lg: '8%', xl: '10%' }}
            pr={{ xs: 0, sm: '2%', md: '4%', lg: '8%', xl: '10%' }}
            pt={2}
            columns={1}
        >
            <Grid item xs={1}>
                <Typography variant='h4'>Account</Typography>
            </Grid>
            <Grid item xs={1} pt={1} pb={1}>
                <Divider />
            </Grid>
            <Grid item xs={1}>

            </Grid>
        </Grid>
    )
}
