import { Grid, useTheme } from "@mui/material";

export default function Footer() {
    const theme = useTheme()

    return (
        <Grid
            container
            justifyContent="center"
            bgcolor='#1d1d1d'
            color='white'
            minHeight='325px'
            alignContent='center'
        >
            footer
        </Grid>
    )
}
