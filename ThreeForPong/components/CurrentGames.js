import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class CurrentGames extends React.Component {
  static get defaultProps() {
    return {
      title: 'Current Games'
    };
  }

  render() {
    return (
      <View>
        <Text>Hi! My name is {this.props.title}.</Text>
      </View>
    )
  }
}
