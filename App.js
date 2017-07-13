import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert, Button } from 'react-native';

export default class App extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <View style={styles.container}>
         <Image source={pic} style={{width: 193, height: 110}}/> 
        <Text>This is a text view</Text>
        <Button
          onPress={onPressLearnMore}
          title='This is a button'
          color='#841584'
          accessibilityLabel='HelloWorld for button'
        />
        <Timer duration='3'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * Represents a timer that is invisible when duration is less than 0.
 * 
 * @prop {int} duration - duration of the timer.
 */
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: props.duration
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      duration: this.state.duration - 1
    });
    console.log(this.state.duration);
  }

  render() {
    return (
      <View>
        { this.state.duration >= 0 ? // show timer if duration is >= 0, otherwise hide it (null)
          <View>
            <Text>Starting...</Text>
            <Text>{this.state.duration}</Text>
          </View>
          : this.componentWillUnmount()
        }
      </View>
    );
  }
}

function onPressLearnMore() {
  Alert.alert('You pressed the button');
}
