import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class CurrentGames extends React.Component {
  static get defaultProps() {
    return {
      title: 'home'
    };
  }

  render() {
    return (
      <View>
        <Text>
          Welcome to Three For Pong!
        </Text>
      </View>
    )
  }
}
