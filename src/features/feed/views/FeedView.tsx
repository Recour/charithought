import React from "react";
import FeedComponent from "../components/FeedComponent";
import {Box} from "@material-ui/core";
import Scrollbars from "react-custom-scrollbars";

class FeedView extends React.Component<any, any> {
    render() {
        return(
            <Box my={3}>
                <FeedComponent/>
            </Box>
        )
    }
}

export default FeedView;