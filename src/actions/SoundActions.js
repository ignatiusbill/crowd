import {
    LOAD_SOUND,
    LOAD_SOUND_SUCCESS,
    LOAD_SOUND_FAIL
} from './types';

export const loadSound = ({ soundName, uri }) => {
    return async (dispatch) => {
        dispatch({ type: LOAD_SOUND });

        try {
            const soundObj = new Expo.Audio.Sound();
            await soundObj.loadAsync({ uri });
            
            dispatch({ 
                type: LOAD_SOUND_SUCCESS,
                payload: { soundName, soundObj }
            });
        } catch (err) {
            dispatch({ type: LOAD_SOUND_FAIL });
        }
    };
};
