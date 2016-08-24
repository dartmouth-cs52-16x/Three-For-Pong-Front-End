'use strict';

import React, { Component } from 'react';
import { Dimensions, AppRegistry, View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';
import _ from 'lodash';
import Register from './register.js';
import Dashboard from './dashboard.js';

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

var Form = t.form.Form;

var GameForm = t.struct({

  Need: t.String,  // an optional string
  At: t.String              // a required number

});

// overriding the text color
stylesheet.textbox.normal.color = '#FFFFFF';
stylesheet.textbox.normal.borderRadius = 0;
stylesheet.textbox.normal.borderLeftColor = '#1B676B';
stylesheet.textbox.normal.borderRightColor = '#1B676B';
stylesheet.textbox.normal.borderTopColor = '#1B676B';
stylesheet.textbox.normal.height = 100;
stylesheet.textbox.normal.fontSize = 48;




var options = {
  auto: 'placeholders',
  fields: {
    Need: {
      keyboardType: 'phone-pad',
      autoCorrect: false,
      autoCapitalize: 'none',
      placeholderTextColor: 'white',
      clearButtonMode: 'while-editing',
      keyboardAppearance: 'dark',
      selectionColor: '#88C425',
      returnKeyType: 'next',
      autoCapitalize: 'none',
      stylesheet: stylesheet,
    },
    At: {
      keyboardType: 'default',
      autoCorrect: false,
      autoCapitalize: 'none',
      placeholderTextColor: 'white',
      clearButtonMode: 'while-editing',
      keyboardAppearance: 'dark',
      selectionColor: '#88C425',
      returnKeyType: 'next',
      autoCapitalize: 'none',
      stylesheet: stylesheet,
    }
  }
};

class CreateGame extends Component {

  constructor(props){
   super(props);

   this.state = {
     navigator: this.props.navigator
   };

   this._onPress = this._onPress.bind(this);
  //  this._onForward = this._onForward.bind(this);
 }


   _onPress() {
     //var value = this.refs.form.getValue();
     this.props.navigator.push({
       title: 'Games',
       component: Dashboard,
       passProps: { navigator: this.props.navigator }
     });
   }


 render() {
   return (
     <View style={styles.container}>

     <Image source={require('../3forponglogo.png')} style={styles.logo} />

       {/* display */}
       <Form
         ref="form"
         type={GameForm}
         options={options}
         style={styles.title}
       />
       <TouchableHighlight style={styles.button} onPress={this._onPress} underlayColor='#99d9f4'>
         <Text style={styles.buttonText}>CREATE</Text>
       </TouchableHighlight>
     </View>
   );
 }
 }

 const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   padding: 20,
   backgroundColor: '#1B676B',
 },
 logo: {
   maxWidth: 150,
   maxHeight: 150,
   marginTop: 200,
   marginBottom: 40,
   alignSelf: 'center',
 },
 title: {
   fontSize: 30,
   alignSelf: 'center',
   marginBottom: -200,
   marginTop: 200,
   color: 'white',
   backgroundColor: 'white',
 },
 buttonText: {
   fontSize: 24,
   color: 'white',
   alignSelf: 'center'
 },
 button: {
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#88C425',
   paddingTop: 25,
   paddingBottom: 25,
   width: Dimensions.get('window').width,
   marginLeft: -20,
   marginTop: 105,
   marginBottom: -230,
 }
 });

export default CreateGame;
