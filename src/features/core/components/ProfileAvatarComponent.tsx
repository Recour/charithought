import React from "react";
import {
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Grid,
    Box,
    Typography,
    Divider,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import {withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ProfileComponent from "../../profile/components/ProfileComponent";

interface Props {
    displayName: string
    avatarUrl: string
    email: string
    signOut: () => void
    classes: any
}

interface State {
    anchorEl: any
}

const styles = {
    avatar: {
        width: '30px',
        height: '30px'
    }
};

class ProfileAvatarComponent extends React.Component<Props, State> {
    constructor(props:Props) {
        super(props);

        this.state = {
            anchorEl: null
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    render() {
        const {displayName, avatarUrl, email, signOut, classes} = this.props;

        return(
            <div>
                <IconButton onClick={this.handleClick} size={'small'}>
                    <Avatar alt={displayName} src={avatarUrl} className={classes.avatar}/>
                </IconButton>

                <Menu anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} onClose={this.handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                      transformOrigin={{ vertical: "top", horizontal: "center" }} getContentAnchorEl={null}>
                    <Box mx={1}>
                        <ProfileComponent/>
                    </Box>

                    <Box my={1}>
                        <Divider/>
                    </Box>

                    <Link to={'/profile'} style={{textDecoration: 'none', color: 'black'}}>
                        <MenuItem onClick={this.handleClose}>
                            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                            <ListItemText>Profile</ListItemText>
                        </MenuItem>
                    </Link>

                    <MenuItem onClick={this.handleClose}>
                        <ListItemIcon><MessageIcon/></ListItemIcon>
                        <ListItemText>Thoughts</ListItemText>
                    </MenuItem>

                    <MenuItem onClick={signOut}>
                        <ListItemIcon><ArrowBackIcon/></ListItemIcon>
                        <ListItemText>Sign Out</ListItemText>
                    </MenuItem>
                </Menu>
            </div>
        )
    }

    handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState({anchorEl: event.currentTarget});
    }

    handleClose() {
        this.setState({anchorEl: null});
    }
}

export default withStyles(styles)(ProfileAvatarComponent);