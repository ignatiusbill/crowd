import { 
    RESET_SCORE,
    INCREMENT_SCORE, 
    PASS, 
    IS_ANSWERING, 
    DONE_ANSWERING,
    SET_WORD_LIST
} from './types';

export const resetScore = () => {
    return {
        type: RESET_SCORE
    };
};

export const incrementScore = (score) => {
    return {
        type: INCREMENT_SCORE,
        payload: score
    };
};

export const pass = (score) => {
    return {
        type: PASS,
        payload: score
    };
};

export const isAnswering = () => {
    return {
        type: IS_ANSWERING
    };
};

export const doneAnswering = () => {
    return {
        type: DONE_ANSWERING
    };
};

export const setWordList = (words) => {
    return {
        type: SET_WORD_LIST,
        payload: words
    };
};
