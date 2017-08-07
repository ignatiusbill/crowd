import { 
    RESET_SCORE,
    INCREMENT_SCORE, 
    PASS, 
    IS_ANSWERING, 
    DONE_ANSWERING,
    SET_WORD_LIST
} from '../actions/types';

const INITIAL_STATE = { 
    score: 0,
    hasAnswered: false,
    words: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESET_SCORE:
            return { ...state, score: 0 };
        case INCREMENT_SCORE:
            return { ...state, score: action.payload + 1 };
        /* case PASS - to be replaced with some other logic
         * Right now, Scoreboard is only showing <# of correct answers>/<total # of words>
         * so this returning just state is OK
         * 
         * In the future, would love to change it to a key-value pair showing which one's 
         * right or wrong
         */
        case PASS:
            return state;
        case IS_ANSWERING:
            return { ...state, hasAnswered: true };
        case DONE_ANSWERING:
            return { ...state, hasAnswered: false };
        case SET_WORD_LIST:
            return { ...state, words: action.payload };
        default:
            return state;
    }
};
