import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet, NavigatorIOS, TouchableHighlight  } from 'react-native';


class AnotherPage extends Component {

  constructor(props) {
    super(props);

    // STATE
    this.state = { on: true };

    this.renderButton = this.renderButton.bind(this);
  }

  renderButton() {
     let display = this.state.on ? 'ON' : 'OFF';
     return (
       <TouchableHighlight onPress={() => this.setState({ on: !this.state.on })}>
         <Text style={styles.button}>{display}</Text>
       </TouchableHighlight>
     );
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <Text style={styles.text}>
          This is some filler text to tell you that youve
          navigated to another page.
        </Text>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    marginTop: 30,
    fontSize: 50,
  },
  text: {
    color: 'green',
    fontSize: 40,
  },
});


export default AnotherPage
