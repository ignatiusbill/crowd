import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    };
    
    render() {
        const { navigate } = this.props.navigation;

        return (
            <View>
                <Text>Crowd</Text>
                <Button 
                    title='Play'
                    onPress={() => navigate('Play')} 
                />
            </View>
        );
    }
}

export { HomeScreen };
