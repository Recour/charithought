import React from "react";
import { AppBar, Toolbar, Typography, withStyles, Grid, Button, Box } from "@material-ui/core";
import {connect, useSelector} from "react-redux";
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import ProfileAvatarComponent from "./ProfileAvatarComponent";
import {Link} from "react-router-dom";
import StyledButton from "../../../styling/components/StyledButton";
import SignInDialog from "../../authentication/components/SignInDialog";

interface Props {
    auth: any
    profile: any
    firebase: any
    classes: any
}

interface State {
    signInDialogOpen: boolean
}

const styles = (theme:any) => ({
    appBar: {
        backgroundColor: 'white'
    },
    toolbar: theme.mixins.toolbar,
    button: {
        color: 'white',
        borderColor: 'white'
    }
});

class Navbar extends React.Component<Props, State> {
    constructor(props:Props) {
        super(props);

        this.state = {
            signInDialogOpen: false
        };

        this.handleOpenSignInDialog = this.handleOpenSignInDialog.bind(this);
        this.handleCloseSignInDialog = this.handleCloseSignInDialog.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    render() {
        const {classes, auth, profile} = this.props;
        return(
            <div>
                <AppBar position="static" elevation={0} className={classes.appBar}>
                    <Toolbar variant={'dense'}>
                        <Grid container justify={'space-between'} alignItems={'center'} alignContent={'center'}>
                            <Grid item>
                                <Link to={'/'} style={{textDecoration: 'none', color: 'rgb(68,200,170)'}}>
                                    <Typography variant="h6">
                                        Charithought
                                    </Typography>
                                </Link>
                            </Grid>


                            {
                                auth.isLoaded && auth.isEmpty ?
                                    <Grid item>
                                        <StyledButton onClick={this.handleOpenSignInDialog} text={'Sign In'}></StyledButton>
                                        <SignInDialog open={this.state.signInDialogOpen} onClose={this.handleCloseSignInDialog} firebase={this.props.firebase}/>
                                    </Grid>
                                    :
                                    auth.isLoaded && !auth.isEmpty ?
                                    <Grid item>
                                        <Grid container justify={'space-between'} alignItems={'center'} alignContent={'center'}>
                                            <Grid item>
                                                <Link to={'/donate'} style={{textDecoration: 'none'}}>
                                                    <StyledButton text={'Donate'}></StyledButton>
                                                </Link>
                                            </Grid>

                                            <Grid item>
                                                <Box mr={1} ml={1}>
                                                    <ProfileAvatarComponent
                                                        displayName={profile.displayName}
                                                        avatarUrl={profile.avatarUrl}
                                                        email={profile.email}
                                                        signOut={this.signOut}
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                        : null
                            }

                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    handleOpenSignInDialog() {
        this.setState({signInDialogOpen: true});
    }

    handleCloseSignInDialog() {
        this.setState({signInDialogOpen: false});
    }

    signOut() {
        const {firebase} = this.props;
        return firebase.logout();
    }
}

const mapStateToProps = (state:any) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

export default withFirebase(withStyles(styles)(connect(mapStateToProps, {})(Navbar))) as React.ComponentType;