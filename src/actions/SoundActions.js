import { LOAD_SOUND } from './types';

export const loadSound = ({ soundName, uri }) => {
    return async (dispatch) => {
        try {
            const soundObj = new Expo.Audio.Sound();
            await soundObj.loadAsync({ uri });
            
            dispatch({ 
                type: LOAD_SOUND,
                payload: { soundName, soundObj }
            });
        } catch (err) {
            // do nothing for now
            console.log(err);
        }
    };
};
