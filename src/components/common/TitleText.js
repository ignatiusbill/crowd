import React from 'react';
import { Text } from 'react-native';

const TitleText = ({ children, style }) => {
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
        justifyContent: 'center',
        color: '#007aff',
        fontSize: 40,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10
    }
};

export { TitleText };
