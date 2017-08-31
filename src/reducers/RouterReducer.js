import {
    NAV_TO_HOME,
    NAV_TO_PLAY,
    NAV_TO_SCOREBOARD
} from '../actions/types';

const INITIAL_STATE = {
    isPlaying: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NAV_TO_HOME:
            return { ...state, isPlaying: false };
        case NAV_TO_PLAY:
            return { ...state, isPlaying: true };
        case NAV_TO_SCOREBOARD:
            return { ...state, isPlaying: false };
        default:
            return state;
    }
};
