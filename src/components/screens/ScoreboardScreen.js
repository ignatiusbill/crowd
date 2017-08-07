import React, { Component } from 'react';
import Orientation from 'react-native-orientation-locker';
import { connect } from 'react-redux';
import { CardSection, MyText, Button } from '../common';

class ScoreboardScreen extends Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        Orientation.lockToPortrait();
    }

    navToHome() {
        const { goBack } = this.props.navigation;
        const { HomeKey } = this.props.navigation.state.params;

        goBack(HomeKey);
    }

    render() {
        const { score, words } = this.props;
        console.log(score);
        console.log(words);

        return (
            <CardSection>
                <MyText>Your score: {score}/{words.length}</MyText>
                <Button onPress={() => this.navToHome()}>
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
