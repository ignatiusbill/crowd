import React, { Component } from 'react';
import { View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { CardSection, Button, TitleText } from '../common';

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
            <CardSection style={{ flex: 1 }}>
                <View style={{ flex: 0.2 }} />
                
                <TitleText>Crowd</TitleText>
                
                <View style={{ flex: 0.2 }} />
                
                <Button onPress={() => navigate('Play')}>
                    Play
                </Button>

                 <View style={{ flex: 0.4 }} /> 
            </CardSection>
        );
    }
}

export default HomeScreen;
