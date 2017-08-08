import React, { Component } from 'react';
import { View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import axios from 'axios';
import { connect } from 'react-redux';
import { CardSection, Button, TitleText } from '../common';
import { setWordList } from '../../actions';

class HomeScreen extends Component {
    static navigationOptions = {
        header: null
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

export default connect(null, { setWordList })(HomeScreen);
