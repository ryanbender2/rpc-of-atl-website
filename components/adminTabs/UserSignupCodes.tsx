import { Box, Card, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, useTheme } from "@mui/material";

export default function UserSignupCodesTab() {
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
                
            </Grid>
        </Grid>
    )
}
