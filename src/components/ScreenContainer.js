import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import PlayScreen from './screens/PlayScreen';
import ScoreboardScreen from './screens/ScoreboardScreen';

const ScreenContainer = StackNavigator({
    Home: { screen: HomeScreen },
    Play: { screen: PlayScreen },
    Scoreboard: { screen: ScoreboardScreen }
});

export default ScreenContainer;
