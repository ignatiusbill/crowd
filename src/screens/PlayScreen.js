import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { connect } from 'react-redux';
import Timer from '../components/Timer';
import AccelerometerSensor from '../components/AccelerometerSensor';
import { CardSection, WordText } from '../components/common';
import { resetScoreboard, navToScoreboard } from '../actions';

class PlayScreen extends Component {
    constructor(props) {
        super(props);

        this.gameDuration = 15;
        this.delayBeforeScoreboard = 1;
        if (this.props.words) {
            this.wordCount = this.props.words.length;
        } else {
            this.wordCount = 0;
        }
        
        this.props.resetScoreboard();
    }

    componentDidMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_RIGHT);

        const { navToScoreboard } = this.props;

        this.timerID = setTimeout(() => {
            navToScoreboard();
        }, (this.gameDuration + this.delayBeforeScoreboard) * 1000);
    }

    componentWillUnmount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

        clearTimeout(this.timerID);
    }

    startGame() {
        return (
            <View style={{ flex: 1 }}>
                <AccelerometerSensor duration={this.gameDuration} />{/* subscribes to accelerometer; renders nothing */}
                {this.renderPlayScreen()}
            </View>
        );
    }

    renderPlayScreen() {
        const { tiltingDown, tiltingUp } = this.props;
        const { tiltingDownViewStyle, tiltingUpViewStyle, defaultViewStyle } = styles;

        if (tiltingDown) {
            return (
                <CardSection style={tiltingDownViewStyle}>
                    {this.renderWords()}
                    {this.renderTimer()}
                </CardSection>
            );
        } else if (tiltingUp) {
            return (
                <CardSection style={tiltingUpViewStyle}>
                    {this.renderWords()}
                    {this.renderTimer()}
                </CardSection>
            );
        }
        
        return (
            <CardSection style={defaultViewStyle}>
                {this.renderWords()}
                {this.renderTimer()}
            </CardSection>
        );
    }

    renderWords() {
        const { tiltingDown, tiltingUp } = this.props;
        const { wordViewContainerStyle } = styles;
        const animDuration = 100;
        const delay = 0;

        if (tiltingDown || tiltingUp) {
            return (
                <View 
                    animation={'fadeOutLeft'}
                    duration={animDuration}
                    delay={delay}
                    style={wordViewContainerStyle}
                >
                    {this.getWord()}
                </View>
            );
        } 

        return (
            <View 
                animation={'fadeInRight'}
                duration={animDuration}
                delay={delay}
                style={wordViewContainerStyle}
            >
                {this.getWord()}
            </View>
        );
    }

    renderTimer() {
        const { timerViewStyle } = styles;

        return (
            <View style={timerViewStyle}>
                <Timer duration={this.gameDuration} />
            </View>
        );
    }

    getWord() {
        const { words, index } = this.props;
        const { wordViewStyle } = styles;
        
        if (index >= this.wordCount) {
            return (
                <View style={wordViewStyle}>
                    <WordText>Out of words!</WordText>
                </View>
            );
        }

        return (
            <View style={wordViewStyle}>
                <WordText>{words[index].word}</WordText>
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
    wordViewContainerStyle: {
        flex: 1
    },
    wordViewStyle: {
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
