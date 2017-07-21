import React, { Component } from 'react';
import { View } from 'react-native';
import { Accelerometer } from 'react-native-sensors';
import { MyText } from './common';

class MotionSensor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: props.words,
            index: 0,
            wordCount: props.words.length,
            accelerationObservable: new Accelerometer({ updateInterval: 500 })
        };
    }

    componentWillMount() {
        const { accelerationObservable } = this.state;
        
        accelerationObservable
            .map(({ z }) => z)
            .subscribe(speed => this.processMotion(speed));

        setTimeout(() => {
            accelerationObservable.stop();
        }, this.props.duration * 1000);
    }

    componentWillUnmount() {
        this.state.accelerationObservable.stop();
    }

    processMotion(speed) {
        const { index } = this.state;

        if (speed > -10 && speed < 7) {
            console.log('thinking');
            return;
        } else if (speed <= -10) {
            console.log('OK');
        } else {
            console.log('PASS');
        }

        this.setState({
            index: index + 1
        });
    }

    renderWords() {
        const { words, index, wordCount } = this.state;

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

export { MotionSensor };
