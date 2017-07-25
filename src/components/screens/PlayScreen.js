import React, { Component } from 'react';
import { View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { Timer } from '..';
import MotionSensor from '../MotionSensor';
import { CardSection } from '../common';
import words from '../../reducers/words.json';

class PlayScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            gameDuration: 5,
            delayBeforeScoreboard: 1
        };
    }

    componentDidMount() {
        Orientation.lockToLandscapeRight();

        const { gameDuration, delayBeforeScoreboard } = this.state;

        this.timerID = setTimeout(() => {
            this.navigateToScoreboard();
        }, (gameDuration + delayBeforeScoreboard) * 1000);
    }

    componentWillUnmount() {
        Orientation.lockToPortrait();

        clearTimeout(this.timerID);
    }

    navigateToScoreboard() {
        const { navigate } = this.props.navigation;
        const { key } = this.props.navigation.state;
        
        return navigate('Scoreboard', { HomeKey: key });
    }

    startGame() {
        const { gameDuration } = this.state;

        return (
            <CardSection>
                <Timer duration={gameDuration} />
                <MotionSensor
                    duration={gameDuration} 
                    words={words}
                />
            </CardSection>
        );
    }

    render() {
        return (
            <View>
                {this.startGame()}
            </View>
        );
    }
}

export default PlayScreen;
