import { StackNavigator } from 'react-navigation';
import { HomeScreen, PlayScreen } from './components/screens';
// import ScoreboardScreen from './src/components/screens/ScoreboardScreen';

const App = StackNavigator({
    Play: { screen: PlayScreen },
    Home: { screen: HomeScreen },
    // Scoreboard: { screen: ScoreboardScreen }
});

export default App;
