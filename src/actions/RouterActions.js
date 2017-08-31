import { Actions } from 'react-native-router-flux';
import {
    NAV_TO_HOME,
    NAV_TO_PLAY,
    NAV_TO_SCOREBOARD
} from './types';

export const navToHome = () => {
    return (dispatch) => {
        dispatch({ type: NAV_TO_HOME });

        Actions.home({ type: 'reset' });
    };
};

export const navToPlay = () => {
    return (dispatch) => {
        dispatch({ type: NAV_TO_PLAY });

        Actions.play();
    };
};

export const navToScoreboard = () => {
    return (dispatch) => {
        dispatch({ type: NAV_TO_SCOREBOARD });

        Actions.scoreboard();
    };
};
