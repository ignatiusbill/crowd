import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Timer from '../components/Timer';
import AccelerometerSensor from '../components/AccelerometerSensor';
import { CardSection, WordText } from '../components/common';
import { resetScoreboard, navToScoreboard } from '../actions';

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
        const { navToScoreboard } = this.props;

        this.timerID = setTimeout(() => {
            navToScoreboard();
        }, (gameDuration + delayBeforeScoreboard) * 1000);
    }

    componentWillUnmount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

        clearTimeout(this.timerID);
    }

    startGame() {
        const { gameDuration } = this.state;

        return (
            <CardSection style={{ flex: 1 }}>
                <AccelerometerSensor duration={gameDuration} />{/* renders nothing */}
                {this.renderPlayScreen()}
            </CardSection>
        );
    }

    renderPlayScreen() {
        const { tiltingDown, tiltingUp } = this.props;
        const { tiltingDownViewStyle, tiltingUpViewStyle, defaultViewStyle } = styles;

        if (tiltingDown) {
            return (
                <View style={tiltingDownViewStyle}>
                    {this.renderWords()}
                    {this.renderTimer()}
                </View>
            );
        } else if (tiltingUp) {
            return (
                <View style={tiltingUpViewStyle}>
                    {this.renderWords()}
                    {this.renderTimer()}
                </View>
            );
        }

        return (
            <View style={defaultViewStyle}>
                {this.renderWords()}
                {this.renderTimer()}
            </View>
        );
    }

    renderWords() {
        const { words, index } = this.props;
        const { wordTextViewStyle } = styles;
        
        if (index >= this.wordCount) {
            return (
                <View style={wordTextViewStyle}>
                    <WordText>Out of words!</WordText>
                </View>
            );
        }

        return (
            <View style={wordTextViewStyle}>
                <WordText>{words[index].word}</WordText>
            </View>
        );
    }

    renderTimer() {
        const { gameDuration } = this.state;
        const { timerViewStyle } = styles;

        return (
            <View style={timerViewStyle}>
                <Timer duration={gameDuration} />
            </View>
        );
    }

    render() {
        return this.startGame();
    }
}

const styles = {
    tiltingDownViewStyle: {
        flex: 1,
        backgroundColor: '#afe086'
    },
    tiltingUpViewStyle: {
        flex: 1,
        backgroundColor: '#e0d286'
    },
    defaultViewStyle: {
        flex: 1
    },
    wordTextViewStyle: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    timerViewStyle: {
        flex: 1,
        justifyContent: 'flex-start'
    }
};

const mapStateToProps = state => {
    return {
        index: state.score.index,
        words: state.score.words,
        tiltingDown: state.score.tiltingDown,
        tiltingUp: state.score.tiltingUp
    };
};

export default connect(mapStateToProps, { resetScoreboard, navToScoreboard })(PlayScreen);
