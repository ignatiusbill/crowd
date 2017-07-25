import user from './user.json';
import { INCREMENT_SCORE, PASS, IS_ANSWERING, DONE_ANSWERING } from '../actions/types';

const INITIAL_STATE = { score: user.score, hasAnswered: user.hasAnswered };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INCREMENT_SCORE:
            return { ...state, score: action.payload + 1 };
        case PASS:
            return state;
        case IS_ANSWERING:
            return { ...state, hasAnswered: true };
        case DONE_ANSWERING:
            return { ...state, hasAnswered: false };
        default:
            return state;
    }
};
