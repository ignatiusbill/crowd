import { LOAD_SOUND } from '../actions/types';

const INITIAL_STATE = {
    correctSFX: null,
    passSFX: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_SOUND:
            return { ...state, [action.payload.soundName]: action.payload.soundObj };
        default:
            return state;
    }
};
