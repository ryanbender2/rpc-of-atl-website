import { Box, Card, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, useTheme } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoImage from '../../public/android-chrome-512x512.png'
import Image from 'next/image'
import Router, { useRouter } from "next/router";
import AccountTab from "../../components/adminTabs/Account";
import UserSignupCodesTab from "../../components/adminTabs/UserSignupCodes";
import { getAuth } from "firebase/auth";
import AdminPageNotSignedIn from "../../components/AdminPageNotSignedIn";


enum TAB_NAMES {
    ACCOUNT = 'Account',
    USER_SIGNUP_CODES = 'UserSignupCodes'
}

const TABS = new Map<string, JSX.Element>([
    [TAB_NAMES.ACCOUNT, <AccountTab key={1} />],
    [TAB_NAMES.USER_SIGNUP_CODES, <UserSignupCodesTab key={1} />]
])


export default function Index() {
    const auth = getAuth()
    const { query } = useRouter()

    if (!auth.currentUser) {
        return <AdminPageNotSignedIn />
    }

    const tab: any = query.tab
    let TabEle = TABS.get(tab ? tab : '')
    if (!TabEle) {
        TabEle = <AccountTab />
    }

    return (
        <>
            <AdminMenu />
            <Grid
                container
                pl='255px' // account for menu
            >
                {TabEle}
            </Grid>
        </>
    )
}

const AdminMenu = () => {
    const theme = useTheme()
    const { pathname } = useRouter()

    const changeTab = (tab: string) => {
        Router.push(pathname + `?tab=${tab}`)
    }

    return (
        <Drawer
            anchor='left'
            variant='permanent'
            PaperProps={{
                elevation: 2
            }}
        >
            <Box
                p={2}
                display='flex'
                justifyContent='center'
            >
                <Box pr={1} justifyContent='center' alignItems='center' display='flex'>
                    <Image
                        src={LogoImage}
                        alt="Logo"
                        width={38}
                        height={38}
                        layout="fixed"
                    />
                </Box>
                <Divider orientation="vertical" />
                <Box pl={1}>
                    <Typography fontStyle='italic' fontWeight='bold'>RPC of Atlanta</Typography>
                    <Typography fontStyle='italic'>Admin tools</Typography>
                </Box>
            </Box>
            <Divider />
            <List>
                <ListItem>
                    <ListItemButton onClick={() => changeTab(TAB_NAMES.ACCOUNT)}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary='Account' />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={() => changeTab(TAB_NAMES.USER_SIGNUP_CODES)}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary='User Signup Codes' />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}
