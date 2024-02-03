import React from "react";
import { withStyles, Button, Box } from "@material-ui/core";

interface Props {
    text: string
    classes: any
    onClick?: () => void
}

const styles = {
    root: {
        borderRadius: "30px",
        backgroundColor: "rgb(68,200,170)",
        color: "white"
    }
};

class StyledButton extends React.Component<Props, any> {
    render() {
        const {text, classes, onClick} = this.props;

        return(
            <Button onClick={onClick} size={'small'} className={classes.root} style={{textTransform: 'none'}}>
                <Box mx={1}>
                    <strong>{text}</strong>
                </Box>
            </Button>
        )
    }
}

export default withStyles(styles)(StyledButton);