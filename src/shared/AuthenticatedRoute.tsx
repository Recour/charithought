import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class AuthenticatedRoute extends React.Component<any, any> {
    render() {
        const { auth, component, ...rest } = this.props;
        const RenderedComponent = component;

        return (
            <Route {...rest} render={props => {
                if (auth.isLoaded && auth.isEmpty) {
                    return <Redirect to={'/'}/>
                } else {
                    return <RenderedComponent {...props} />
                }
            }
            }/>

        );

    }
}

const mapStateToProps = (state:any) => {
    return {
        auth: state.firebase.auth
    }
};

export default connect(
    mapStateToProps,
    {}
)(AuthenticatedRoute)
