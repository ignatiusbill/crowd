import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { connect } from 'react-redux';
import { CardSection, Button, TitleText, Spinner } from '../components/common';
import { loadEmptyWordList, loadWordList, loadSound, navToPlay } from '../actions';

const BASE_URL = 'https://thawing-sea-57517.herokuapp.com';

class HomeScreen extends Component {
    componentWillMount() {
        const { loadWordList, loadSound } = this.props;

        // loadEmptyWordList();
        loadWordList({ url: BASE_URL + '/v1/words.json' });
        loadSound();
    }

    componentDidMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);
    }

    renderButton() {
        const { isWordListLoading, isSoundLoading, navToPlay } = this.props;
        
        if (isWordListLoading && isSoundLoading) {
            return <Spinner size='large' />;
        }

        return (
            <Button onPress={navToPlay.bind(this)}>
                Play
            </Button>
        );
    }

    render() {
        return (
            <CardSection style={{ flex: 1 }}>
                <View 
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    animation={'fadeInDown'}
                    duration={600}
                    delay={400}
                >
                    <TitleText>Crowd</TitleText>
                </View>
                
                <View 
                    style={{ flex: 1 }}
                    animation={'fadeInDown'}
                    duration={600}
                    delay={400}
                >
                    {this.renderButton()}
                </View>
            </CardSection>
        );
    }
}

const mapStateToProps = state => {
    return {
        isWordListLoading: state.score.loading,
        isSoundLoading: state.sound.loading
    };
};

export default connect(mapStateToProps, 
    { loadEmptyWordList, loadWordList, loadSound, navToPlay }
)(HomeScreen);
