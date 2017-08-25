import React, { Component } from 'react';
import { Accelerometer } from 'expo';
import { connect } from 'react-redux';
import { WordText } from './common';
import { 
    incrementScore, 
    pass, 
    isAnswering, 
    doneAnswering 
} from '../actions';

class AccelerometerSensor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            words: this.props.words,
            index: 0,
            accelerometerData: {}
        };
    }

    componentDidMount() {
        this.toggle();
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }
    
    toggle = () => {
        if (this.subscription) {
            this.unsubscribe();
        } else {
            this.subscribe();
        }
    }

    subscribe = () => {
        this.subscription = Accelerometer.addListener((result) => {
            this.processMotion(result.z);
        });
    }
    
    unsubscribe = () => {
        this.subscription && this.subscription.remove();
        this.subscription = null;
    }

    processMotion(zSpeed) {
        const { index } = this.state;
        const { score, hasAnswered } = this.props;
        const wordCount = this.state.words.length;

        const isThinking = zSpeed > -0.75 && zSpeed < 0.75;
        const isCorrect = zSpeed <= -0.75;

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

function round(n) {
    if (!n) {
    return 0;
    }

    return Math.floor(n * 100) / 100;
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
)(AccelerometerSensor);
