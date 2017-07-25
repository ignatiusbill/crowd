import React, { Component } from 'react';
import Orientation from 'react-native-orientation-locker';
import { CardSection, Button, MyText } from '../common';

class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        Orientation.lockToPortrait();
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <CardSection>
                <MyText>Crowd</MyText>
                <Button onPress={() => navigate('Play')}>
                    Play
                </Button>
            </CardSection>
        );
    }
}

export default HomeScreen;
