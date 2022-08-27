import { Box, Button, Grid, Paper, styled } from "@mui/material"
import { getAuth } from "firebase/auth"
import { addNewSignupCodeForUser, generateSignupCode } from "../../lib/signupCodes"


export default function Signup() {
    const auth = getAuth()

    const handleClick = async () => {
        const code = generateSignupCode('Ryan', 'Bender')
        await addNewSignupCodeForUser(auth.currentUser?.uid, code)
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
