import React, { Component } from 'react';
import { View } from 'react-native';
import { Accelerometer } from 'react-native-sensors';
import { connect } from 'react-redux';
import { MyText } from './common';
import { incrementScore, pass } from '../actions';

class MotionSensor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: props.words,
            index: 0,
            accelerationObservable: new Accelerometer({ updateInterval: 500 })
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
        const { score } = this.props;
        const wordCount = this.state.words.length;

        if (speed > -10 && speed < 7) {
            // console.log('thinking');
            return;
        } else if (speed <= -10) {
            // console.log('OK');
            if (score < wordCount) {
                this.props.incrementScore(score);
            }
        } else {
            // console.log('PASS');
            this.props.pass(score);
        }

        this.setState({
            index: index + 1
        });
    }

    renderWords() {
        const { words, index } = this.state;
        const wordCount = this.state.words.length;
        
        if (index >= wordCount) {
            return <MyText>We're out of words!</MyText>;
        }

        return <MyText>Current word: {words[index].word}</MyText>;
    }

    render() {
        return (
            <View>
                {this.renderWords()}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        score: state.user.score
    };
};

export default connect(mapStateToProps, { incrementScore, pass })(MotionSensor);
