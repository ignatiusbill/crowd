import React from 'react';
import { Text } from 'react-native';

const TimerText = ({ children, style }) => {
    const { textStyle } = styles;

    return (
        <Text style={[textStyle, style]}>
            {children}
        </Text>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 30,
        fontWeight: '600'
    }
};

export { TimerText };
