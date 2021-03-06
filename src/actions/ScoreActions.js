import axios from 'axios';
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
} from './types';

export const resetScoreboard = () => {
    return {
        type: RESET_SCOREBOARD
    };
};

export const correctAnswer = (words, index) => {
    const updatedWords = words;
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
    const modifiedWordList = words;
    modifiedWordList[index].seenByUser = true;

    return {
        type: WORD_SEEN_BY_USER,
        payload: modifiedWordList
    };
};

export const loadEmptyWordList = () => {
    return {
        type: LOAD_EMPTY_WORD_LIST
    };
};

export const loadWordList = ({ url }) => {
    return (dispatch) => {
        dispatch({ type: LOAD_WORD_LIST });
        
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
        type: LOAD_WORD_LIST_SUCCESS,
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
        type: LOAD_WORD_LIST_FAIL,
        payload: setWordListFailJSON
    });
};
