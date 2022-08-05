import { Box, Grid, Paper, styled, Switch, useTheme } from "@mui/material"
import { useContext, useState } from "react";
import { ColorModeContext } from "../lib/theme";


export default function Header() {
    const { toggleColorMode } = useContext(ColorModeContext);
    const theme = useTheme();
    const [background, setBackground] = useState('transparent');

    const toggleBackground = () => {
        setBackground(
            background === 'transparent' ?
                theme.palette.mode === 'dark' ? '#1A2027' : theme.palette.background.paper :
                'transparent'
        )
    }
    theme.transitions.easing.easeInOut
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box
            sx={{
                bgcolor: background,
                minHeight: theme.spacing(11),
                transition: theme.transitions.create(
                    ['background-color', 'transform'],
                    { duration: 1250 }
                ),
                boxShadow: '1px 10px 5px 3px rgba(0,0,0,0.08)'
            }}
        >
            <Grid sx={{ minHeight: '100%' }} flexDirection='row'>
                <Grid item xs={2}>
                    <Switch onChange={toggleColorMode}/>
                </Grid>
                <Grid item xs={4}>
                    <Switch onChange={toggleBackground}/>
                </Grid>
            </Grid>
        </Box>
    )
}

/*
<Grid container spacing={2} flexDirection="row" >
            <Grid item xs={8}>
                <Item>xs=8</Item>
            </Grid>
            <Grid item xs={4}>
                <Switch onChange={toggleColorMode}/>
            </Grid>

        </Grid>
    )
*/