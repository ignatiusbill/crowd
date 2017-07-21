import React, { Component } from 'react';
import Orientation from 'react-native-orientation-locker';
import { CardSection, MyText } from '../common';

class ScoreboardScreen extends Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        Orientation.lockToPortrait();
    }

    render() {
        return (
            <CardSection>
                <MyText>ScoreboardScreen.js</MyText>
            </CardSection>
        );
    }
}

export { ScoreboardScreen };
