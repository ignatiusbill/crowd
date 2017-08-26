import { combineReducers } from 'redux';
import ScoreReducer from './ScoreReducer';
import LoaderReducer from './LoaderReducer';

export default combineReducers({
    user: ScoreReducer,
    loader: LoaderReducer
});
