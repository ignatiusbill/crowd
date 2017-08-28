import axios from 'axios';
import { 
    RESET_SCOREBOARD,
    CORRECT_ANSWER, 
    PASS, 
    IS_ANSWERING, 
    DONE_ANSWERING,
    WORD_SEEN_BY_USER,
    SET_WORD_LIST_SUCCESS,
    SET_WORD_LIST_FAIL
} from './types';

export const resetScoreboard = () => {
    return {
        type: RESET_SCOREBOARD
    };
};

export const correctAnswer = (words, index) => {
    let updatedWords = words;
    updatedWords[index].correct = true;

    return {
        type: CORRECT_ANSWER,
        payload: updatedWords
    };
};

export const pass = () => {
    return {
        type: PASS
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

export const wordSeenByUser = (words, index) => {
    let modifiedWordList = words;
    modifiedWordList[index].seenByUser = true;

    return {
        type: WORD_SEEN_BY_USER,
        payload: modifiedWordList
    };
};

export const setWordList = ({ url }) => {
    return (dispatch) => {
        // TODO: handle UI
        // dispatch({ type: GETTING_WORDS });
        
        axios.get(url)
            .then(response => setWordListSuccess(dispatch, response))
            .catch(() => setWordListFail(dispatch));
    };
};

const setWordListSuccess = (dispatch, response) => {
    // add a "correct" attribute to every word (making it a key-value pair)
    const modifiedWordList = response.data.words.map(obj => {
        const newData = {};
        newData.word = obj.word;
        newData.correct = false;
        newData.seenByUser = false;
        return newData;
    });

    dispatch({
        type: SET_WORD_LIST_SUCCESS,
        payload: modifiedWordList
    });
};

const setWordListFail = (dispatch) => {
    const setWordListFailJSON = { 
        "words": [
            {
                "word": "onSetWordListFail",
                "correct": false
            }
        ]
    };

    dispatch({
        type: SET_WORD_LIST_FAIL,
        payload: setWordListFailJSON
    });
};
