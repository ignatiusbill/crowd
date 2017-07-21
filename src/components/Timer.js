import React, { Component } from 'react';
import { View } from 'react-native';
import { MyText } from './common';

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

        if (duration >= 1 && waitForToShow > 0) {
            return;
        } else if (duration >= 1 && waitForToShow <= 0) {
            return <MyText>{text}{'\n'}{duration}</MyText>;
        }

        this.componentWillUnmount();
    }

    render() {
        return (
            <View>
                {this.renderTimer()}
            </View>
        );
    }
}

export { Timer };
