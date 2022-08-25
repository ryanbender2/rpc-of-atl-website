import { Box, Button, Grid, Paper, styled } from "@mui/material"
import { getAuth } from "firebase/auth"
import { genSignupCodeForUser } from "../../lib/firebase";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Signup() {
    const auth = getAuth()

    const handleClick = async () => {
        const code = await genSignupCodeForUser('Ryan', 'Bender')
        console.table({
            code: code,
            first: 'Ryan',
            last: 'Bender'
        })
    }

    return (
        <Grid
            container
            columns={16}
            pl={{ xs: 0, sm: '7%', md: '15%', lg: '18%', xl: '20%' }}
            pr={{ xs: 0, sm: '7%', md: '15%', lg: '18%', xl: '20%' }}
        >
            <Grid item xs={4}>
                
            </Grid>
            <Grid item xs={8}>
                
                <Button
                    onClick={handleClick}
                >
                    Gen Code
                </Button>
            </Grid>
            <Grid item xs={4}>
                
            </Grid>
        </Grid>
    )
}
