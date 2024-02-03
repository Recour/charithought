import React from "react";
import {
    Container,
    Box,
    withStyles,
    Slide,
} from "@material-ui/core";
import ThoughtComponent from "../../../shared/ThoughtComponent";
import {connect} from "react-redux";
import "firebase/firestore";
import {firestoreConnect, populate} from 'react-redux-firebase'
import {compose} from "redux";
import {addThought} from "../../../redux/thoughts/ThoughtsActionCreators";
import { Divider, Grid } from '@material-ui/core';
import AddThoughtComponent from "../../donate/components/DonateComponent";
import {BASE_URL, thoughtPopulates} from "../../../constants/Constants";
import {
    FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton,
    FacebookShareButton,
    RedditIcon,
    RedditShareButton,
    TwitterIcon,
    TwitterShareButton,
    LinkedinShareButton,
    LinkedinIcon
} from "react-share";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Thought} from "../../../models/thoughts-models/ThoughtsModels";
import ThoughtCarouselComponent from "./ThoughtCarouselComponent";
import StyledCircularProgressComponent from "../../../shared/StyledCircularProgressComponent";

interface Props {
    thoughtsById: Object
    thoughtsByPrice: Object
    addThought: (thought:Thought) => {}
    id: number
    price: number
    classes: any
}

const styles = {
    title: {
        fontWeight: 100
    }
};

class FeedComponent extends React.Component<Props, any> {
    render() {
        const {thoughtsById, thoughtsByPrice, addThought, id, classes} = this.props;
        let shareMessage = 'Share a thought for good cause.';
        return (
            <Container>
                {
                    (thoughtsById && thoughtsByPrice) ?
                        (
                            <Grid container>
                                <Grid item xs={12}>
                                    <ThoughtCarouselComponent thoughtsList={Object.values(thoughtsByPrice)}/>
                                </Grid>

                                {
                                    Object.values(thoughtsById).map((thought: any) => (
                                        <Grid item xs={12} sm={6} md={4} key={thought.id}>
                                            <Box m={2}>
                                                <Slide
                                                    direction={'up'} in={true} mountOnEnter unmountOnExit
                                                >
                                                    <ThoughtComponent thought={thought} truncateMessage={true} clickable={true} key={thought.id}/>
                                                </Slide>
                                            </Box>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        )
                        :
                        <Grid container justify={'center'}>
                            <Grid item>
                                <Box m={3}>
                                    <StyledCircularProgressComponent/>
                                </Box>
                            </Grid>
                        </Grid>
                }

                {
                    /*
                <Box m={1}>
                    <FacebookShareButton url={BASE_URL} quote={shareMessage}>
                        <FacebookIcon round size={32}/>
                    </FacebookShareButton>
                    <TwitterShareButton url={BASE_URL} title={shareMessage}>
                        <TwitterIcon round size={32}/>
                    </TwitterShareButton>
                    <RedditShareButton url={BASE_URL} title={shareMessage}>
                        <RedditIcon round size={32}/>
                    </RedditShareButton>
                    <FacebookMessengerShareButton url={BASE_URL} title={shareMessage} appId={''}>
                        <FacebookMessengerIcon round size={32}/>
                    </FacebookMessengerShareButton>
                    <LinkedinShareButton url={BASE_URL}>
                        <LinkedinIcon round size={32}/>
                    </LinkedinShareButton>
                </Box>
                    */
                }
            </Container>
        )
    }
}

const populates = thoughtPopulates;

const mapStateToProps = (state:any) => {
    return {
        thoughtsById: populate(state.firestore, 'thoughtsById', populates),
        thoughtsByPrice: populate(state.firestore, 'thoughtsByPrice', populates),
    }
};

const mapDispatchToProps = (dispatch:any) => {
    return({
        addThought: (thought:any) => dispatch(addThought(thought))
    })
};

export default withStyles(styles)(compose(
    firestoreConnect(() => [
        { collection: 'thoughts', orderBy: ['id', 'desc'], limit: 50, storeAs: 'thoughtsById', populates },
        { collection: 'thoughts', orderBy: ['price', 'desc'], limit: 5, storeAs: 'thoughtsByPrice', populates },
    ]),
    connect(mapStateToProps, mapDispatchToProps)
)(FeedComponent) as React.ComponentType);