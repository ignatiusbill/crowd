import React, { Component } from 'react';
import { View } from 'react-native';
import { TimerText } from './common';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: props.duration || 3,
            text: props.text,
            waitForToShow: props.waitForToShow || 0
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        const { duration, waitForToShow } = this.state;

        if (waitForToShow > 0) {
            this.setState({
                waitForToShow: waitForToShow - 1
            });
        } else {
            this.setState({
                duration: duration - 1
            });
        }        
    }

    renderTimer() {
        const { duration, text, waitForToShow } = this.state;
        const lastSecondToShow = 1;
        const waitForThreshold = 0;

        if (waitForToShow > waitForThreshold) { // If waitForToShow > 0, ...
            return <View />;                    // busy return
        }

        if (duration >= lastSecondToShow) {
            return <TimerText>{text}{'\n'}{duration}</TimerText>; // display timer
        }

        this.componentWillUnmount();
        return <View />; // has to return at least one UI component or it will throw an error
    }

    render() {
        return this.renderTimer();
    }
}

export { Timer };
