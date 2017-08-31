import React, { Component } from 'react';
import { BackHandler, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, MyText, Button } from '../components/common';
import { navToHome } from '../actions';

class ScoreboardScreen extends Component {
    componentDidMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

        BackHandler.addEventListener('hardwareBackPress', this.props.navToHome);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.props.navToHome);
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
        const { words } = this.props; // states
        const { navToHome } = this.props; // actions

        return (
            <ScrollView>
                <CardSection>
                    <View>
                        {this.renderScore(words)}
                    </View>
                    <Button onPress={navToHome.bind(this)}>
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

export default connect(mapStateToProps, { navToHome })(ScoreboardScreen);
