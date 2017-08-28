import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button, TitleText } from '../components/common';
import { setWordList } from '../actions';

class HomeScreen extends Component {
    componentWillMount() {
        this.props.setWordList({ url: 'https://thawing-sea-57517.herokuapp.com/v1/words.json' });
    }

    componentDidMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);
    }

    navToPlay() {
        Actions.play();
    }

    render() {
        return (
            <CardSection style={{ flex: 1 }}>
                <View style={{ flex: 0.2 }} />
                
                <TitleText>Crowd</TitleText>
                
                <View style={{ flex: 0.2 }} />
                
                <Button onPress={this.navToPlay.bind(this)}>
                    Play
                </Button>

                <View style={{ flex: 0.4 }} /> 
            </CardSection>
        );
    }
}

export default connect(null, { setWordList })(HomeScreen);
