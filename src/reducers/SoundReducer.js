import {
    LOAD_SOUND,
    LOAD_SOUND_SUCCESS,
    LOAD_SOUND_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    correctSFX: null,
    passSFX: null,
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_SOUND:
            return { ...state, loading: true };
        case LOAD_SOUND_SUCCESS:
            return {
                ...state,
                correctSFX: action.payload.correctSFX,
                passSFX: action.payload.passSFX,
                loading: false
            };
        case LOAD_SOUND_FAIL:
            return { ...state, loading: true };
        default:
            return state;
    }
};
