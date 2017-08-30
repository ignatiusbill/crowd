import { 
    RESET_SCOREBOARD,
    CORRECT_ANSWER, 
    PASS, 
    IS_ANSWERING, 
    DONE_ANSWERING,
    WORD_SEEN_BY_USER,
    LOAD_WORD_LIST_SUCCESS,
    LOAD_WORD_LIST_FAIL
} from '../actions/types';

const INITIAL_STATE = { 
    index: 0,
    words: null,
    hasAnswered: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESET_SCOREBOARD:
            return { ...state, index: 0 };
        case CORRECT_ANSWER:
            return { ...state, words: action.payload, index: state.index + 1 };
        case PASS:
            return { ...state, index: state.index + 1 };
        case IS_ANSWERING:
            return { ...state, hasAnswered: true };
        case DONE_ANSWERING:
            return { ...state, hasAnswered: false };
        case WORD_SEEN_BY_USER:
            return { ...state, words: action.payload };
        case LOAD_WORD_LIST_SUCCESS:
            return { ...state, words: action.payload };
        case LOAD_WORD_LIST_FAIL:
            return { ...state, words: action.payload };
        default:
            return state;
    }
};
