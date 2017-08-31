import {
    LOAD_SOUND,
    LOAD_SOUND_SUCCESS,
    LOAD_SOUND_FAIL
} from './types';

const BASE_URL = 'https://thawing-sea-57517.herokuapp.com';

export const loadSound = () => {
    return async (dispatch) => {
        dispatch({ type: LOAD_SOUND });

        try {
            const correctSFX = new Expo.Audio.Sound();
            await correctSFX.loadAsync({ uri: BASE_URL + '/static/crowd_correct.mp3' });

            const passSFX = new Expo.Audio.Sound();
            await passSFX.loadAsync({ uri: BASE_URL + '/static/crowd_pass.wav' });

            dispatch({
                type: LOAD_SOUND_SUCCESS,
                payload: { correctSFX, passSFX }
            });
        } catch (err) {
            dispatch({ type: LOAD_SOUND_FAIL });
        }
    };
};
