import React from "react";
import {withStyles, Dialog, DialogContent, DialogTitle, Typography, Grid, DialogActions, Button, Box, Divider} from "@material-ui/core";
import SignInForm from "./SignInForm";
import {withRouter, RouteComponentProps} from 'react-router'

interface Props extends RouteComponentProps {
    open: boolean
    onClose: () => void
    firebase: any
}

const styles = {
  googleButton: {
      backgroundColor: '#4285F4',
      color: 'white'
  }
};

class SignInDialog extends React.Component<any, any> {
    constructor(props:Props) {
        super(props);

        this.signInWithGoogle = this.signInWithGoogle.bind(this);
    }

    render() {
        const {open, onClose, classes} = this.props;

        return(
            <Dialog open={open} onClose={onClose} maxWidth={'xs'}>
                <DialogTitle>
                    <Grid container justify={'center'}>
                        <Grid item>
                            <Typography variant={'h5'}>
                                Sign in with e-mail and password
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>

                <DialogContent>
                    <SignInForm/>
                </DialogContent>

                <Divider/>

                <DialogActions>
                    <Grid container justify={'center'}>
                        <Grid item>
                            <Box m={1}>
                                <Button onClick={this.signInWithGoogle} className={classes.googleButton} style={{textTransform: 'none'}}>Sign In with Google</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        )
    }

    signInWithGoogle() {
        const {firebase, history, onClose} = this.props;
        return firebase.login({ provider: 'google', type: 'popup' }).then((result:any) => {
            onClose();
            history.push('/feed');
            console.log(result);
        }).catch((error:any) => {
            console.log(error);
        });
    }
}

export default withStyles(styles)(withRouter(SignInDialog));