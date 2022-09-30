import { Box, Button, Grid, Paper, Step, StepLabel, Stepper, styled, TextField, Typography } from "@mui/material"
import { getAuth } from "firebase/auth"
import { useState } from "react"
import { addNewSignupCodeForUser, generateSignupCode } from "../../lib/signupCodes"


export default function Signup() {
    const auth = getAuth()
    const [stepNumber, setStepNumber] = useState(1)
    const [enterCodeStepCompleted, setEnterCodeStepCompleted] = useState(false)
    const [createAccountStepCompleted, setCreateAccountStepCompleted] = useState(false)

    const [codeValue, setCodeValue] = useState('')
    const handleCodeFormSubmit = () => {

    }

    return (
        <Grid
            container
            columns={10}
            pl={{ xs: 0, sm: '7%', md: '15%', lg: '18%', xl: '20%' }}
            pr={{ xs: 0, sm: '7%', md: '15%', lg: '18%', xl: '20%' }}
            height='100%'
            alignItems='center'
        >
            <Grid item xs>

            </Grid>
            <Grid item xs={4}>
                <Stepper activeStep={stepNumber}>
                    <Step completed={enterCodeStepCompleted}>
                        <StepLabel>Enter Code</StepLabel>
                    </Step>
                    <Step completed={createAccountStepCompleted}>
                        <StepLabel>Create Account</StepLabel>
                    </Step>
                </Stepper>
                {
                    stepNumber === 1 ? (
                        <Grid
                            container
                            columns={1}
                            pt={4}
                        >
                            <Grid item xs={1}>
                                <TextField
                                    label="Code"
                                    variant="outlined"
                                    value={codeValue}
                                    onChange={(event) => setCodeValue(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <TextField
                                    label="Code"
                                    variant="outlined"
                                    value={codeValue}
                                    onChange={(event) => setCodeValue(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <TextField
                                    label="Code"
                                    variant="outlined"
                                    value={codeValue}
                                    onChange={(event) => setCodeValue(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={handleCodeFormSubmit}
                                >
                                    enter
                                </Button>
                            </Grid>
                            <Grid item xs={1}>
                                <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center' pt={4}>
                                    <Typography variant='subtitle1' color='text.secondary'>
                                        How do I get a code and why would I need an account?
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid
                            container
                            columns={1}
                        >
                            <Grid item xs={1}>

                            </Grid>
                            <Grid item xs={1}>

                            </Grid>
                            <Grid item xs={1}>

                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
            <Grid item xs>

            </Grid>
        </Grid>
    )
}


