import React from "react";
import {CircularProgress} from "@material-ui/core";

class StyledCircularProgressComponent extends React.Component<any, any> {
    render() {
        return(
            <CircularProgress style={{color: 'lightgrey'}}/>
        )
    }
}

export default StyledCircularProgressComponent;