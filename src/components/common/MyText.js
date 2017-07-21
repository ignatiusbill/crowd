import React from 'react';
import { Text } from 'react-native';

const MyText = ({ children }) => {
    const { textStyle } = styles;

    return (
        <Text style={textStyle}>
            {children}
        </Text>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
};

export { MyText };
