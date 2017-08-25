import React, { Component } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button, TitleText } from '../components/common';
import { setWordList } from '../actions';

class HomeScreen extends Component {
    componentWillMount() {
        axios.get('https://thawing-sea-57517.herokuapp.com/v1/words.json')
            .then(response => this.getWords(response));
    }

    componentDidMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);
    }

    getWords(res) {
        if (res.status === 200) {
            const modifiedWordList = res.data.words.map(obj => {
                const newData = {};
                newData.word = obj.word;
                newData.correct = false;
                return newData;
            });

            this.props.setWordList(modifiedWordList);
        } else {
            this.props.setWordList([]);
        }
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
