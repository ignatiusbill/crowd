import React, { Component } from 'react';
import Screens from './Screens';

// ScreenContainer wraps multiple screens so that each screen can access the Redux store

class ScreenContainer extends Component {
    render() {
        return <Screens screenProps={this.props.store} />;
    }
}

export default ScreenContainer;
