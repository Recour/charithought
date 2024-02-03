import React from "react";
import {Box, Grid, Paper} from "@material-ui/core";
import ProfileComponent from "../components/ProfileComponent";

class ProfileView extends React.Component<any, any> {
    render() {
        return(
            <Grid container justify={'center'}>
                <Grid item>
                    <Paper>
                        <Box mt={3}>
                            <ProfileComponent/>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default ProfileView;