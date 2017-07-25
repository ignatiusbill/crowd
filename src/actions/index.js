import { INCREMENT_SCORE, PASS, IS_ANSWERING, DONE_ANSWERING } from './types';

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
