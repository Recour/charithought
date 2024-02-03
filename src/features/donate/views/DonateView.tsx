import React from "react";
import AddThoughtComponent from "../components/DonateComponent";
import { Container, Box, Typography, Grid, Divider } from "@material-ui/core";

class DonateView extends React.Component<any, any> {
    render() {
        return(
            <Grid container>
                <Grid item xs={12}>
                    <Box m={3}>
                        <Typography variant={'h6'} align={'left'}>
                            Donate to share your message
                        </Typography>

                        <Box my={2}>
                            <Divider/>
                        </Box>

                        <AddThoughtComponent/>
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default DonateView;