import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Accelerometer } from 'react-native-sensors';

class MotionSensor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: props.words,
            index: 0,
            wordCount: props.words.length
        };
    }

    componentWillMount() {
        const accelerationObservable = new Accelerometer({
            updateInterval: 500
        });

        accelerationObservable
            .map(({ z }) => z)
            .subscribe(speed => this.processMotion(speed));

        setTimeout(() => {
            accelerationObservable.stop();
        }, this.props.duration * 1000);
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
            return <Text>We're out of words!</Text>;
        }

        return <Text>Current word: {words[index].word}</Text>;
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
