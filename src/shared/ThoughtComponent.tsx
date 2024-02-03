import React from "react";
import {Thought} from "../models/thoughts-models/ThoughtsModels";
import moment from "moment";
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    IconButton,
    Box,
    Grid,
    Divider,
    Link,
    CardActionArea
} from "@material-ui/core";
import ShareIcon from '@material-ui/icons/Share';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import {withStyles} from "@material-ui/core";
import Truncate from 'react-truncate';
import ShareThoughtComponent from './ShareThoughtComponent';
import {Link as RouterLink} from 'react-router-dom';
import {CHARITIES, Charity} from "../constants/charities/Charities";

interface Props {
    thought: Thought
    classes: any
    truncateMessage: boolean
    clickable: boolean
}

interface State {
    shareDialogOpen: boolean
}

const styles = {
    root: {
        borderRadius: '15px',
    },
    cardContent: {

    },
    shareButton: {},
    bookmarkButton: {
        color: 'rgb(213,97,120)'
    },
    charityLink: {
        color: 'rgb(68,200,170)',
    },
    actionArea: {
        "&:hover $focusHighlight": {
            opacity: 0,
        }
    },
    focusHighlight: {}
};

// @ts-ignore
const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

class ThoughtComponent extends React.Component<Props, State, any> {
    constructor(props:Props) {
        super(props);

        this.state = {
            shareDialogOpen: false
        };

        this.handleOpenShareDialog = this.handleOpenShareDialog.bind(this);
        this.handleCloseShareDialog = this.handleCloseShareDialog.bind(this);
    }

    render() {
        const {thought, classes, truncateMessage, clickable} = this.props;
        const thoughtDetailUrl = `/thought/${thought.id}`;
        const charity = CHARITIES.find((charity:Charity) => {
            return charity.name === thought.charity;
        });

        return(
            <div>
                <Card variant={'outlined'} className={classes.root}>
                    <ConditionalWrapper
                        condition={clickable}
                        // @ts-ignore
                        wrapper={children =>
                            (<RouterLink to={thoughtDetailUrl} style={{ textDecoration: 'none', color: 'black' }}>
                                <CardActionArea classes={{
                                    root: classes.actionArea,
                                    focusHighlight: classes.focusHighlight
                                }}>
                                    {children}
                                </CardActionArea>
                            </RouterLink>)
                        }
                    >
                        <CardContent className={classes.cardContent}>
                            <Box m={0} textAlign={'left'}>
                                <Grid container justify={'space-between'}>
                                    <Grid item>
                                        <Typography variant={'caption'} align={'left'}>
                                            <ConditionalWrapper
                                                condition={!clickable}
                                                // @ts-ignore
                                                wrapper={children => (
                                                    <Link href={
                                                        charity !== undefined ?
                                                            charity.url
                                                        :
                                                            ''
                                                    } className={classes.charityLink}>
                                                        {children}
                                                    </Link>
                                                )}
                                            >
                                                <Box mr={1} className={classes.charityLink}>
                                                    <Typography variant={'caption'} noWrap>
                                                        <strong>{thought.charity}</strong>
                                                    </Typography>
                                                </Box>
                                            </ConditionalWrapper>
                                        </Typography>

                                        <Typography variant={'body2'} color={'textSecondary'} noWrap>
                                            <strong>${thought.price.toFixed(2)}</strong>
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography variant={'caption'} color={'textSecondary'} noWrap>
                                            {moment(thought.timestamp.toMillis()).fromNow()}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Box mt={2} mb={1}>
                                    {
                                        truncateMessage ?
                                            <Typography variant={'body2'} noWrap>
                                                {
                                                    thought.message
                                                }
                                            </Typography>
                                        :
                                            <Typography variant={'body2'}>
                                                {
                                                    thought.message
                                                }
                                            </Typography>
                                    }
                                </Box>
                            </Box>
                        </CardContent>
                    </ConditionalWrapper>

                    <Divider/>

                    <CardActions>
                        <Grid container justify={'space-between'} alignItems={'center'} alignContent={'center'}>
                            <Grid item>
                                <Box m={1}>
                                    <Typography variant={'caption'} color={'textSecondary'}>
                                        {thought.user.displayName}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item>
                                <Box m={1}>
                                    <IconButton onClick={this.handleClickSave} size={'small'} className={classes.bookmarkButton}>
                                        <BookmarkBorderIcon/>
                                    </IconButton>
                                    <IconButton onClick={this.handleOpenShareDialog} size={'small'} className={classes.shareButton}>
                                        <ShareIcon/>
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>

                <ShareThoughtComponent thoughtToShare={thought} handleCloseShareDialog={this.handleCloseShareDialog} shareDialogOpen={this.state.shareDialogOpen}/>
            </div>
        )
    }

    handleClickSave() {

    }

    handleOpenShareDialog() {
        this.setState({shareDialogOpen: true});
    }

    handleCloseShareDialog() {
        this.setState({shareDialogOpen: false});
    }
}

export default withStyles(styles)(ThoughtComponent);