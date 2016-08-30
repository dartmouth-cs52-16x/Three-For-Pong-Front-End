import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  Navigator,
  TouchableHighlight,
  AlertIOS,
  Alert,
  ListView,
} from 'react-native';
import moment from 'moment';
import CreateGame from './create_game';
import Settings from './settings';
import storage from 'react-native-simple-store';

let token = storage.get('token');
