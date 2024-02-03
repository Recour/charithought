import React from "react";
import ThoughtComponent from "../../../shared/ThoughtComponent";
import {Container, withStyles, Box, CircularProgress, Grid} from "@material-ui/core";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect, populate} from "react-redux-firebase";
import {Thought} from "../../../models/thoughts-models/ThoughtsModels";
import {RouteComponentProps} from 'react-router-dom';
import StyledCircularProgressComponent from "../../../shared/StyledCircularProgressComponent";
import {thoughtPopulates} from "../../../constants/Constants";

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {
    thought: Thought
    classes: any
}

const styles = {
    root: {
        height: 'calc(100% - 48px)'
    }
};

class ThoughtDetailView extends React.Component<Props, any> {
    render() {
        const {thought, classes} = this.props;

        return(
            <Grid container justify={'center'} alignItems={'center'} className={classes.root}>
                <Grid item>
                    <Box m={5}>
                        {
                            thought ?
                                <ThoughtComponent thought={thought} truncateMessage={false} clickable={false}/>
                            :
                                <StyledCircularProgressComponent/>
                        }
                    </Box>
                </Grid>
            </Grid>
        )
    }
};

const populates = thoughtPopulates;

const mapStateToProps = (state:any) => {
    if(state.firestore.data.thought) {
        const populatedThought = populate(state.firestore, 'thought', populates);
        const thought = populatedThought[Object.keys(populatedThought)[0]];

        return {
            thought: thought
        }
    }
};

export default withStyles(styles)(compose(
    connect(mapStateToProps, {}),
    firestoreConnect((props:Props) => [
        {
            collection: 'thoughts',
            where: ['id', '==', Number(props.match.params.id)],
            storeAs: 'thought',
            populates
        }
    ])
)(ThoughtDetailView) as React.ComponentType);
