import { StackNavigator } from 'react-navigation';
import { HomeScreen, PlayScreen, ScoreboardScreen } from './components/screens';

const App = StackNavigator({
    Home: { screen: HomeScreen },
    Play: { screen: PlayScreen },
    Scoreboard: { screen: ScoreboardScreen }
});

export default App;
