import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import HomeScreen from './src/screens/HomeScreen';
import PlayScreen from './src/screens/PlayScreen';
import ScoreboardScreen from './src/screens/ScoreboardScreen';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="home" component={HomeScreen} initial />
                <Scene key="play" component={PlayScreen} />
                <Scene key="score" component={ScoreboardScreen} />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
