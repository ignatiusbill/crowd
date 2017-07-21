import React, { Component } from 'react';
import { View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { Timer, MotionSensor } from '..';
import { CardSection } from '../common';

class PlayScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            gameDuration: 3,
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
        
        return navigate('Scoreboard');
    }

    startGame() {
        const { gameDuration } = this.state;

        return (
            <CardSection>
                <Timer duration={gameDuration} />
                <MotionSensor
                    duration={gameDuration} 
                    words={[
                        { word: 'Apple' },
                        { word: 'Banana' },
                        { word: 'Candy' }
                    ]}
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

export { PlayScreen };
