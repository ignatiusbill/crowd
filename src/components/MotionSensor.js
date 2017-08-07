import React, { Component } from 'react';
import { Accelerometer } from 'react-native-sensors';
import { connect } from 'react-redux';
import { WordText } from './common';
import { 
    incrementScore, 
    pass, 
    isAnswering, 
    doneAnswering 
} from '../actions';

class MotionSensor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: this.props.words,
            index: 0,
            accelerationObservable: new Accelerometer({ updateInterval: 250 })
        };
    }

    componentWillMount() {
        this.mountAccelerationObservable();
    }

    componentWillUnmount() {
        this.unmountAccelerationObservable();
    }

    mountAccelerationObservable() {
        const { accelerationObservable } = this.state;
        
        accelerationObservable
            .map(({ z }) => z)
            .subscribe(speed => this.processMotion(speed));

        setTimeout(() => {
            accelerationObservable.stop();
        }, this.props.duration * 1000);
    }

    unmountAccelerationObservable() {
        this.state.accelerationObservable.stop();
    }

    processMotion(speed) {
        const { index } = this.state;
        const { score, hasAnswered } = this.props;
        const wordCount = this.state.words.length;

        const isThinking = speed > -10 && speed < 7;
        const isCorrect = speed <= -10;

        if (isThinking) {
            this.props.doneAnswering();
            return;
        }
        
        if (!hasAnswered) {
            if (isCorrect) {
                if (score < wordCount) {
                    this.props.incrementScore(score);
                }
            } else { // PASS
                this.props.pass(score);
            }

            this.props.isAnswering();
            this.setState({
                index: index + 1
            });
        }
    }

    renderWords() {
        const { words, index } = this.state;
        const wordCount = this.state.words.length;
        
        if (index >= wordCount) {
            return <WordText>We're out of words!</WordText>;
        }

        return <WordText>{words[index].word}</WordText>;
    }

    render() {
        return this.renderWords();
    }
}

const mapStateToProps = state => {
    return {
        score: state.user.score,
        hasAnswered: state.user.hasAnswered
    };
};

export default connect(
    mapStateToProps, 
    { incrementScore, pass, isAnswering, doneAnswering }
)(MotionSensor);
