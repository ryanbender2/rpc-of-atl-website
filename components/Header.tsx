import { Grid, Paper, styled, Switch, useTheme } from "@mui/material"
import { useContext, useState } from "react";
import { ColorModeContext } from "../lib/theme";


export default function Header() {
    const { toggleColorMode } = useContext(ColorModeContext);
    const theme = useTheme();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Grid container spacing={2} flexDirection="row" >
            <Grid item xs={8}>
                <Item>xs=8</Item>
            </Grid>
            <Grid item xs={4}>
                <Switch onChange={toggleColorMode}/>
            </Grid>

        </Grid>
    )
}
