import { combineReducers } from 'redux';
import ScoreReducer from './ScoreReducer';
import SoundReducer from './SoundReducer';

export default combineReducers({
    user: ScoreReducer,
    sound: SoundReducer
});
