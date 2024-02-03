import React from "react";
import {withStyles, Button, Grid, Typography, Avatar, Box} from "@material-ui/core";
import {connect} from "react-redux";

interface Props {
    profile: any
    classes: any
}

const styles = {
    root: {
        justifyContent: 'center'
    }
};

class ProfileComponent extends React.Component<Props, any> {
    render() {
        const {profile, classes} = this.props;

        return(
            <Grid container direction={'row'} justify={'flex-start'} alignItems={'center'}>
                <Box m={1}>
                    <Grid item>
                        <Avatar src={profile.avatarUrl}></Avatar>
                    </Grid>
                </Box>

                <Box m={1}>
                    <Grid item>
                        <Typography align={'left'}>
                            {profile.displayName}
                            <br></br>
                            {profile.email}
                        </Typography>
                    </Grid>
                </Box>
            </Grid>
        )
    }
}

const mapStateToProps = (state:any) => {
    return {
        profile: state.firebase.profile
    }
};

export default withStyles(styles)(connect(mapStateToProps, {})(ProfileComponent)) as React.ComponentType;