import { combineReducers } from 'redux';
import ScoreReducer from './ScoreReducer';

export default combineReducers({
    user: ScoreReducer
});
