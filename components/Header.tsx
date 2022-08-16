import { Box, Breadcrumbs, Grid, Link, Paper, styled, Switch, Typography, useTheme } from "@mui/material"
import { useContext, useState } from "react";
import { ColorModeContext } from "../lib/theme";
import LogoImage from '../public/android-chrome-512x512.png'
import Image from 'next/image'
import { emphasize } from '@mui/material/styles';


export default function Header() {
    const { toggleColorMode } = useContext(ColorModeContext);
    const theme = useTheme();
    const [background, setBackground] = useState('transparent');


    const HeaderNavLink = ({ title, href }: { title: string, href: string }) => {
        const backgroundColor =
            theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800];
        return (
            <Link
                underline="none"
                href={href}
                sx={{
                    paddingLeft: '0.5em',
                    paddingRight: '0.5em',
                    color: theme.palette.text.primary,
                    fontWeight: theme.typography.fontWeightRegular,
                    '&:hover, &:focus': {
                        color: emphasize(backgroundColor, 0.35),
                    },
                    '&:active': {
                        color: emphasize(backgroundColor, 0.12),
                    },
                }}
            >
                {title}
            </Link>
        )
    }


    const toggleBackground = () => {
        setBackground(
            background === 'transparent' ?
                theme.palette.mode === 'dark' ? '#1A2027' : theme.palette.background.paper :
                'transparent'
        )
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Grid
            container
            sx={{
                bgcolor: background,
                minHeight: theme.spacing(17),
                transition: theme.transitions.create(
                    ['background-color', 'transform'],
                    { duration: 1250 }
                ),
                boxShadow: 6,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '20%',
                paddingRight: '20%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <Link href="/">
                    <Image
                        src={LogoImage}
                        alt="Logo"
                        width={70}
                        height={70}
                        layout="fixed"
                    />
                </Link>
                <Box>
                    <Typography variant='h5'>Reformation</Typography>
                    <Typography variant='h5'>Presbyterian Church of Atlanta</Typography>
                </Box>
            </Box>
            <Breadcrumbs
                sx={{
                    fontSize: '1.3em',
                }}
                aria-label="breadcrumb"
                separator=""
            >
                <HeaderNavLink title="About Us" href="/" />
                <HeaderNavLink title="Our Identity" href="/" />
                <HeaderNavLink title="Articles" href="/articles" />
                <HeaderNavLink title="Contact" href="/" />
            </Breadcrumbs>
        </Grid>
    )

    // return (
    //     <Box
    //         sx={{
    //             bgcolor: background,
    //             minHeight: theme.spacing(11),
    //             transition: theme.transitions.create(
    //                 ['background-color', 'transform'],
    //                 { duration: 1250 }
    //             ),
    //             boxShadow: '1px 10px 5px 3px rgba(0,0,0,0.08)'
    //         }}
    //     >
    //         <Grid sx={{ minHeight: '100%' }} flexDirection='row'>
    //             <Grid item xs={2}>
    //                 <Switch onChange={toggleColorMode}/>
    //             </Grid>
    //             <Grid item xs={4}>
    //                 <Switch onChange={toggleBackground}/>
    //             </Grid>
    //         </Grid>
    //     </Box>
    // )
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