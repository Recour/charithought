import React from "react";
import ThoughtComponent from "../../../shared/ThoughtComponent";
// @ts-ignore
import Carousel from 'react-material-ui-carousel';

interface Props {
    thoughtsList: any
}

class ThoughtCarouselComponent extends React.Component<Props, any> {
    render() {
        const {thoughtsList} = this.props;
        return(
            <Carousel interval={6000}>
                {
                    thoughtsList &&
                    (thoughtsList.map((thought: any) => (
                        <ThoughtComponent thought={thought} truncateMessage={true} clickable={true} key={thought.id}/>
                    )))
                }
            </Carousel>
        )
    }
}

export default ThoughtCarouselComponent;