import { Grid, Switch, Typography } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../lib/theme";

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
            <Switch onChange={toggleColorMode}></Switch>
            <Typography>Color Mode</Typography>
        </Grid>
    )
}
