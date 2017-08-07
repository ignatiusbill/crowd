import React, { Component } from 'react';
import { View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { connect } from 'react-redux';
import { Timer } from '..';
import MotionSensor from '../MotionSensor';
import { CardSection } from '../common';
import { resetScore } from '../../actions';

class PlayScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            gameDuration: 10,
            delayBeforeScoreboard: 1
        };
        this.props.resetScore();
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
        const { key, words } = this.props.navigation.state.params;
        
        return navigate('Scoreboard', { HomeKey: key, words });
    }

    startGame() {
        const { gameDuration } = this.state;
        const { words } = this.props.navigation.state.params;

        return (
            <CardSection style={{ flex: 1 }}>
                 <View style={{ flex: 0.4 }} />

                <MotionSensor
                    duration={gameDuration} 
                    words={words}
                />
                
                <Timer duration={gameDuration} />

                 <View style={{ flex: 0.4 }} />  
            </CardSection>
        );
    }

    render() {
        return this.startGame();
    }
}

export default connect(null, { resetScore })(PlayScreen);
