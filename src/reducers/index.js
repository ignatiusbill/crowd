import { combineReducers } from 'redux';
import ScoreReducer from './ScoreReducer';
import SoundReducer from './SoundReducer';
import RouterReducer from './RouterReducer';

export default combineReducers({
    score: ScoreReducer,
    sound: SoundReducer,
    router: RouterReducer
});
