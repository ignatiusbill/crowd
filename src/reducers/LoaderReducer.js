import { 
    SET_WORD_LIST
} from '../actions/types';

const INITIAL_STATE = { 
    words: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_WORD_LIST:
            return { ...state, words: action.payload };
        default:
            return state;
    }
};
