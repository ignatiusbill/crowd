import React, { Component } from 'react';
import { View } from 'react-native';
import { Timer, MotionSensor } from '..';

class PlayScreen extends Component {
    static navigationOptions = {
        header: null
    };

    startGame() {
        const gameDuration = 60;

        return (
            <View>
                <Timer
                    duration={gameDuration}
                />
                <MotionSensor
                    duration={gameDuration} 
                    words={[
                        { word: 'Apple' },
                        { word: 'Banana' },
                        { word: 'Candy' }
                    ]}
                />
            </View>
        );
    }

    render() {
        return (
            <View>
                {this.startGame()}
            </View>
        );
    }
}

export { PlayScreen };
