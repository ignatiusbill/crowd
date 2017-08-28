import React, { Component } from 'react';
import { Accelerometer } from 'expo';
import { connect } from 'react-redux';
import { WordText } from './common';
import { 
    correctAnswer, 
    pass, 
    isAnswering, 
    doneAnswering,
    wordSeenByUser
} from '../actions';

class AccelerometerSensor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accelerometerData: {}
        };
        this.wordCount = this.props.words.length;
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
        this.subscription = Accelerometer.setUpdateInterval(150);
        this.subscription = Accelerometer.addListener((result) => {
            this.processMotion(result.z);
        });
    }
    
    unsubscribe = () => {
        this.subscription && this.subscription.remove();
        this.subscription = null;
    }

    processMotion(zSpeed) {
        const { hasAnswered, words, index } = this.props; // mapToStateProps
        const { doneAnswering, correctAnswer, pass, isAnswering, wordSeenByUser } = this.props; // actions

        wordSeenByUser(words, index);

        const isThinking = zSpeed > -0.75 && zSpeed < 0.75;
        const isCorrect = zSpeed <= -0.75;

        if (isThinking) {
            doneAnswering();
            return;
        }
        
        if (!hasAnswered) {
            if (isCorrect) {
                if (index < this.wordCount) {
                    correctAnswer(words, index);
                }
            } else { // PASS
                pass();
            }

            isAnswering();
        }
    }

    renderWords() {
        const { words, index } = this.props;
        
        if (index >= this.wordCount) {
            return <WordText>Out of words!</WordText>;
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
        index: state.user.index,
        words: state.user.words,
        hasAnswered: state.user.hasAnswered
    };
};

export default connect(
    mapStateToProps, 
    { correctAnswer, pass, isAnswering, doneAnswering, wordSeenByUser }
)(AccelerometerSensor);
