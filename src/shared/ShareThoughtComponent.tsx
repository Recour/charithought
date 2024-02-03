import React from "react";
import {
    FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton,
    FacebookShareButton, LinkedinIcon, LinkedinShareButton,
    RedditIcon,
    RedditShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import {BASE_URL} from "../constants/Constants";
import {Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Typography, Divider, Container} from "@material-ui/core";
import {Thought} from "../models/thoughts-models/ThoughtsModels";

interface Props {
    shareDialogOpen: boolean
    handleCloseShareDialog: any
    thoughtToShare: Thought
}

interface State {
    shareDialogOpen: boolean
}

class ShareThoughtComponent extends React.Component<Props, State> {
    constructor(props:Props) {
        super(props);

        this.state = {
            shareDialogOpen: false
        };
    }

    render() {
        const {thoughtToShare} = this.props;

        const thoughtUrl = BASE_URL + `/thought/${thoughtToShare.id}`;

        const shareMessage = thoughtToShare.message + ' - $' + thoughtToShare.price.toFixed(2) + ' donated to ' + thoughtToShare.charity;

        return(
            <Dialog onClose={this.props.handleCloseShareDialog} open={this.props.shareDialogOpen} fullWidth={true} maxWidth={'xs'}>
                <DialogTitle>
                    <Grid container justify={'center'}>
                        <Grid item>
                            <Typography variant={'h5'}>
                                Share thought on social media
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>

                <Divider/>

                <DialogContent>
                    <Grid container justify={'center'}>
                        <Grid item>
                            <Box m={1}>
                                <FacebookShareButton url={thoughtUrl} quote={shareMessage}>
                                    <FacebookIcon round size={32}/>
                                </FacebookShareButton>
                            </Box>
                        </Grid>

                        <Grid item>
                            <Box m={1}>
                                <TwitterShareButton url={thoughtUrl} title={shareMessage}>
                                    <TwitterIcon round size={32}/>
                                </TwitterShareButton>
                            </Box>
                        </Grid>

                        <Grid item>
                            <Box m={1}>
                                <FacebookMessengerShareButton url={thoughtUrl} title={shareMessage} appId={'2685800144880124'}>
                                    <FacebookMessengerIcon round size={32}/>
                                </FacebookMessengerShareButton>
                            </Box>
                        </Grid>

                        <Grid item>
                            <Box m={1}>
                                <RedditShareButton url={thoughtUrl} title={shareMessage}>
                                    <RedditIcon round size={32}/>
                                </RedditShareButton>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.handleCloseShareDialog} size={'small'}>Close</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default ShareThoughtComponent;