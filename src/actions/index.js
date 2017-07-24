export const incrementScore = (score) => {
    return {
        type: 'increment_score',
        payload: score
    };
};

export const pass = (score) => {
    return {
        type: 'pass',
        payload: score
    };
};
