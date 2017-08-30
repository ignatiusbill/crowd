import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button, TitleText, Spinner } from '../components/common';
import { loadWordList, loadSound } from '../actions';

const BASE_URL = 'https://thawing-sea-57517.herokuapp.com';

class HomeScreen extends Component {
    componentWillMount() {
        const { loadWordList, loadSound } = this.props;

        loadWordList({ url: BASE_URL + '/v1/words.json' });

        loadSound({ soundName: 'correctSFX', uri: BASE_URL + '/static/crowd_correct.mp3' });
        loadSound({ soundName: 'passSFX', uri: BASE_URL + '/static/crowd_pass.wav' });
    }

    componentDidMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);
    }

    navToPlay() {
        Actions.play();
    }

    renderButton() {
        const { isWordListLoading, isSoundLoading } = this.props;
        
        if (isWordListLoading && isSoundLoading) {
            return <Spinner size='large' />;
        }

        return (
            <Button onPress={this.navToPlay.bind(this)}>
                Play
            </Button>
        );
    }

    render() {
        return (
            <CardSection style={{ flex: 1 }}>
                <View style={{ flex: 0.2 }} />
                
                <TitleText>Crowd</TitleText>
                
                <View style={{ flex: 0.2 }} />
                
                {this.renderButton()}

                <View style={{ flex: 0.4 }} /> 
            </CardSection>
        );
    }
}

const mapStateToProps = state => {
    return {
        isWordListLoading: state.user.loading,
        isSoundLoading:  state.sound.loading
    };
};

export default connect(mapStateToProps, { loadWordList, loadSound })(HomeScreen);
