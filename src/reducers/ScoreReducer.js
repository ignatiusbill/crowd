import user from './user.json';

const INITIAL_STATE = { score: user.score };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'increment_score':
            return { ...state, score: action.payload + 1 };
        case 'pass':
            return state;
        default:
            return state;
    }
};
