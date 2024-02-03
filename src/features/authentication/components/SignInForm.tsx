import React from "react";
import {Container, Typography, Grid, Box, TextField, Dialog, Button} from "@material-ui/core";

class SignInForm extends React.Component<any, any> {
    render() {
        return(
            <Grid container justify={'center'}>
                <Grid item xs={12}>
                    <Box m={1}>
                        <TextField label={'E-mail'} variant={'outlined'} required disabled fullWidth/>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box m={1}>
                        <TextField label={'Password'} variant={'outlined'} required disabled fullWidth/>
                    </Box>
                </Grid>

                <Grid item>
                    <Box m={1}>
                        <Button variant={'outlined'} disabled>Sign In</Button>
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default SignInForm;