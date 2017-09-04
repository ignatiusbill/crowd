import React, { Component } from 'react';
import { BackHandler, ScrollView } from 'react-native';
import { View } from 'react-native-animatable';
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
        if (words) {
            const animDuration = 1000;
            const delay = 200;

            return words.map((wordObj, index) => {
                const { word, correct, seenByUser } = wordObj;
                const { correctAnswerStyle, passedAnswerStyle } = styles;

                if (seenByUser) {
                    if (correct) {
                        return (
                            <View
                                key={index}
                                animation={'fadeIn'}
                                duration={animDuration}
                                delay={delay * index}
                            >
                                <MyText style={correctAnswerStyle}>{word}</MyText>
                            </View>
                        );
                    }
        
                    return (
                        <View
                            key={index}
                            animation={'fadeIn'}
                            duration={animDuration}
                            delay={delay * index}
                        >
                            <MyText style={passedAnswerStyle}>{word}</MyText>
                        </View>
                    );
                }
    
                return null;
            });
        }
        
        return <MyText>Empty word list</MyText>;
    }

    render() {
        const { words } = this.props; // mapToStateProps
        const { navToHome } = this.props; // actions

        return (
            <ScrollView>
                <CardSection>
                    <MyText>
                        Scoreboard
                    </MyText>

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
        color: '#8ce045'
    },
    passedAnswerStyle: {
        color: '#db3b3b'
    }
};

const mapStateToProps = state => {
    return {
        words: state.score.words
    };
};

export default connect(mapStateToProps, { navToHome })(ScoreboardScreen);
