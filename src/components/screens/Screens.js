import { StackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import PlayScreen from './PlayScreen';
import ScoreboardScreen from './ScoreboardScreen';

const Screens = StackNavigator({
    Home: { screen: HomeScreen },
    Play: { screen: PlayScreen },
    Scoreboard: { screen: ScoreboardScreen },
});

export default Screens;
