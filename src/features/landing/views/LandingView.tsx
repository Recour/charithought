import React from "react";
import {Grid, withStyles, Typography, Box, Button, List, ListItem, ListItemText, Link as MaterialLink} from "@material-ui/core";
import StyledButton from "../../../styling/components/StyledButton";
import {CHARITIES, Charity} from "../../../constants/charities/Charities";
import {Link} from 'react-router-dom';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import {SOCIAL_MEDIA_URLS} from "../../../constants/Constants";

const styles = {
    fullHeight: {
        height: '100%'
    },
    fullHeightWithNavbar: {
        height: 'calc(100% - 48px)'
    },
    coloredText: {
        color: 'rgb(68,200,170)'
    },
    whiteBackground: {
        backgroundColor: 'white'
    }
};

class LandingView extends React.Component<any, any> {
    render() {
        const {classes} = this.props;
        const charityListSize = 10;

        return(
            <div className={classes.fullHeight}>
                <Grid container alignItems={'center'} className={classes.fullHeightWithNavbar}>
                    <Grid item xs={12}>
                        <Box m={1}>
                            <Typography variant={'h2'}>
                                <strong>Share a thought for charity</strong>
                            </Typography>

                            <Box m={1}>
                                <Typography variant={'h6'}>
                                    Support a <span className={classes.coloredText}>good cause</span>. Raise <span className={classes.coloredText}>awareness</span>.
                                </Typography>
                            </Box>

                            <Box m={2}>
                                <Link to={'/feed'} style={{textDecoration: 'none'}}>
                                    <StyledButton text={'View thoughts'}></StyledButton>
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container alignItems={'center'} className={`${classes.fullHeight} ${classes.whiteBackground}`}>
                    <Grid item xs={12} sm={6}>
                        <Box m={1}>
                            <Typography variant={'h4'}>
                                <strong>How it works</strong>
                            </Typography>
                        </Box>

                        <Box m={1}>
                            <Typography variant={'h6'}>
                                * Pick a charity and donation amount
                                <br></br>
                                * Write your thought
                                <br></br>
                                * Share thoughts on social media
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <Box m={1}>
                        <List>
                            {CHARITIES.slice(0, charityListSize).map((charity:Charity) => {
                                return(
                                    <MaterialLink href={charity.url} >
                                        <Typography id={charity.name}>
                                            {charity.name}
                                        </Typography>
                                    </MaterialLink>
                                )
                            })}

                            <Typography>
                                ...and more
                            </Typography>
                        </List>
                    </Box>
                </Grid>
                </Grid>

                <Grid container alignItems={'center'} className={classes.fullHeight}>
                    <Grid item xs={12}>
                        <Box m={2}>
                            <Typography>
                                Made in Belgium with ❤️
                            </Typography>
                        </Box>

                        <Box m={1}>
                            <MaterialLink href={SOCIAL_MEDIA_URLS.facebook} style={{textDecoration: 'none', color: 'black'}}>
                                <FacebookIcon/>
                            </MaterialLink>
                            <MaterialLink href={SOCIAL_MEDIA_URLS.instagram} style={{textDecoration: 'none', color: 'black'}}>
                                <InstagramIcon/>
                            </MaterialLink>
                            <MaterialLink href={SOCIAL_MEDIA_URLS.twitter} style={{textDecoration: 'none', color: 'black'}}>
                                <TwitterIcon/>
                            </MaterialLink>
                        </Box>

                        <Box m={1}>
                            <Typography variant={'caption'}>
                                {
                                    // TODO: Add privacy notice & terms of service
                                }
                                <Link to={'/'} style={{textDecoration: 'none', color: 'black'}}>Privacy</Link>
                                {" | "}
                                <Link to={'/'} style={{textDecoration: 'none', color: 'black'}}>Terms of service</Link>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(LandingView);