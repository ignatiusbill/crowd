import React, { Component } from 'react';
import { View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import axios from 'axios';
import { CardSection, Button, TitleText } from '../common';

class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
        words: null
    };

    componentWillMount() {
        axios.get('https://thawing-sea-57517.herokuapp.com/v1/words.json')
        .then(response => this.getWords(response));
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }

    getWords(res) {
        if (res.status === 200) {
            this.setState({ words: res.data.words });
        } else {
            console.log('Something went wrong!');
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <CardSection style={{ flex: 1 }}>
                <View style={{ flex: 0.2 }} />
                
                <TitleText>Crowd</TitleText>
                
                <View style={{ flex: 0.2 }} />
                
                <Button onPress={() => navigate('Play', { words: this.state.words })}>
                    Play
                </Button>

                 <View style={{ flex: 0.4 }} /> 
            </CardSection>
        );
    }
}

export default HomeScreen;
