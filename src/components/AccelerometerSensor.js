import { Component } from 'react';
import { Accelerometer } from 'expo';
import { connect } from 'react-redux';
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

        if (this.props.words) {
            this.wordCount = this.props.words.length;
        } else {
            this.wordCount = 0;
        }
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
        this.subscription = Accelerometer.setUpdateInterval(200);
        this.subscription = Accelerometer.addListener((result) => {
            this.processMotion(round(result.z));
        });
    }
    
    unsubscribe = () => {
        this.subscription && this.subscription.remove();
        this.subscription = null;
    }

    processMotion(zSpeed) {
        if (this.props.isPlaying && this.props.index < this.wordCount) {
            const { hasAnswered, words, index, correctSFX, passSFX } = this.props; // mapToStateProps
            const { doneAnswering, correctAnswer, pass, isAnswering, wordSeenByUser } = this.props; // actions

            wordSeenByUser(words, index);

            const isThinking = zSpeed > -0.75 && zSpeed < 0.75;

            if (isThinking) {
                if (hasAnswered) {
                    doneAnswering();
                    return;
                }
                
                return;
            }

            const isCorrect = zSpeed <= -0.75; // isPassing = zSpeed >= 0.75
            
            if (!hasAnswered) {
                if (isCorrect) {
                    this.playSound(correctSFX);
                    correctAnswer(words, index);
                } else {
                    this.playSound(passSFX);
                    pass();
                }

                isAnswering();
            }
        }
    }

    playSound(sound) {
        if (sound) {
            sound.playFromPositionAsync(0);
        }
    }

    render() {
        return null;
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
        index: state.score.index,
        words: state.score.words,
        hasAnswered: state.score.hasAnswered,
        correctSFX: state.sound.correctSFX,
        passSFX: state.sound.passSFX,
        isPlaying: state.router.isPlaying
    };
};

export default connect(
    mapStateToProps, 
    { correctAnswer, pass, isAnswering, doneAnswering, wordSeenByUser }
)(AccelerometerSensor);
