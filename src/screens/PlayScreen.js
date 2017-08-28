import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Timer from '../components/Timer';
import AccelerometerSensor from '../components/AccelerometerSensor';
import { CardSection } from '../components/common';
import { resetScoreboard } from '../actions';

class PlayScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameDuration: 10,
            delayBeforeScoreboard: 1
        };
        this.props.resetScoreboard();
    }

    componentDidMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_RIGHT);

        const { gameDuration, delayBeforeScoreboard } = this.state;

        this.timerID = setTimeout(() => {
            this.navigateToScoreboard();
        }, (gameDuration + delayBeforeScoreboard) * 1000);
    }

    componentWillUnmount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

        clearTimeout(this.timerID);
    }

    navigateToScoreboard() {
        return Actions.scoreboard();
    }

    startGame() {
        const { gameDuration } = this.state;

        return (
            <CardSection style={{ flex: 1 }}>
                <View style={{ flex: 0.4 }} />

                <AccelerometerSensor duration={gameDuration} />
                
                <Timer duration={gameDuration} />

                <View style={{ flex: 0.4 }} />  
            </CardSection>
        );
    }

    render() {
        return this.startGame();
    }
}

export default connect(null, { resetScoreboard })(PlayScreen);
