import React, { Component } from 'react';
import { BackHandler, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, MyText, Button } from '../components/common';

class ScoreboardScreen extends Component {
    componentDidMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

        BackHandler.addEventListener('hardwareBackPress', this.navToHome);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.navToHome);
    }

    navToHome() {
        Actions.home({ type: 'reset' });
    }

    renderScore(words) {
        return words.map((wordObj, index) => {
            const { word, correct, seenByUser } = wordObj;
            const { correctAnswerStyle, passedAnswerStyle } = styles;

            if (seenByUser) {
                if (correct) {
                    return <MyText key={index} style={correctAnswerStyle}>{word}</MyText>;
                }
    
                return <MyText key={index} style={passedAnswerStyle}>{word}</MyText>;
            }
        });
    }

    render() {
        const { words } = this.props;

        return (
            <ScrollView>
                <CardSection>
                    <View>
                        {this.renderScore(words)}
                    </View>
                    <Button onPress={this.navToHome.bind(this)}>
                        Go to Main Menu
                    </Button>
                </CardSection>
            </ScrollView>
        );
    }
}

const styles = {
    correctAnswerStyle: {
        color: 'green'
    },
    passedAnswerStyle: {
        color: 'orange'
    }
};

const mapStateToProps = state => {
    return {
        words: state.user.words
    };
};

export default connect(mapStateToProps)(ScoreboardScreen);
