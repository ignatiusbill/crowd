import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, MyText, Button } from '../components/common';

class ScoreboardScreen extends Component {
    componentDidMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

        BackHandler.addEventListener('hardwareBackPress', this.navToHome.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.navToHome.bind(this));
    }

    navToHome() {
        Actions.home({ type: 'reset' });
    }

    render() {
        const { score, words } = this.props;

        return (
            <CardSection>
                <MyText>Your score: {score}/{words.length}</MyText>
                <Button onPress={this.navToHome.bind(this)}>
                     Go to Main Menu
                </Button> 
            </CardSection>
        );
    }
}

const mapStateToProps = state => {
    return {
        score: state.user.score,
        words: state.user.words
    };
};

export default connect(mapStateToProps)(ScoreboardScreen);
