import { 
    RESET_SCOREBOARD,
    CORRECT_ANSWER, 
    PASS, 
    IS_ANSWERING, 
    DONE_ANSWERING,
    WORD_SEEN_BY_USER,
    LOAD_EMPTY_WORD_LIST,
    LOAD_WORD_LIST,
    LOAD_WORD_LIST_SUCCESS,
    LOAD_WORD_LIST_FAIL
} from '../actions/types';

const INITIAL_STATE = { 
    index: 0,
    words: null,
    hasAnswered: false,
    loading: false,
    tiltingDown: false,
    tiltingUp: false,
    indexIncremented: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESET_SCOREBOARD:
            return { ...state, index: 0 };
        case CORRECT_ANSWER:
            return { ...state, words: action.payload, tiltingDown: true };
        case PASS:
            return { ...state, tiltingUp: true };
        case IS_ANSWERING:
            return { ...state, hasAnswered: true, indexIncremented: false };
        case DONE_ANSWERING:
            return { 
                ...state, 
                index: state.index + 1,
                indexIncremented: true,
                hasAnswered: false, 
                tiltingDown: false, 
                tiltingUp: false
            };
        case WORD_SEEN_BY_USER:
            return { ...state, words: action.payload };
        case LOAD_EMPTY_WORD_LIST:
            // return { ...state, words: {} };
            // return { ...state, words: [] };
            return state;
        case LOAD_WORD_LIST:
            return { ...state, loading: true };
        case LOAD_WORD_LIST_SUCCESS:
            return { ...state, words: action.payload, loading: false };
        case LOAD_WORD_LIST_FAIL:
            return { ...state, words: action.payload, loading: false };
        default:
            return state;
    }
};
