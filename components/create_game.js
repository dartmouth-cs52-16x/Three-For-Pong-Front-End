'use strict';

import React, { Component } from 'react';
import { Dimensions, AppRegistry, View, Text, StyleSheet, Image, ScrollView, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';
import _ from 'lodash';
import Register from './register.js';
import Dashboard from './dashboard.js';
import storage from 'react-native-simple-store';

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

var Form = t.form.Form;

var token = storage.get('token');

let date = new Date();
let min_date = date;
let temp = new Date;
temp.setDate(temp.getDate() + 1);
let max_date = temp;
let curr_month = date.getMonth();

var Positive = t.refinement(t.Number, function (n) {
  return ((n >= 1) && (n<=3));
});

Positive.getValidationErrorMessage = function (value, path, context) {
  return 'Please request between 1 and 3 Players';
};

var GameForm = t.struct({

  Need: Positive,  // an optional string
  At: t.Date
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
      stylesheet: stylesheet,
      minimumDate: min_date,
      maximumDate: max_date,
    }
  }
};

class CreateGame extends Component {

  constructor(props){
   super(props);

   this.state = {
     user_info: this.props.user_info,
     user_id: this.props.user_id,
     token: this.props.token,
   };

   this._onPress = this._onPress.bind(this);
  //  this._onForward = this._onForward.bind(this);
 }


   _onPress() {
     //var value = this.refs.form.getValue();
     var value = this.refs.form.getValue();
     if (!value) {
       console.log("Problems");
       return null;
     }
     var num_needed = (4 - value.Need);
     var time = value.At;
     console.log(`${this.state.user_info}`);
     fetch('https://threeforpong.herokuapp.com/api/listings/', {
       method: 'POST',
       headers: {
         'Authorization': `${this.state.token}`,
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         host_user_id: `${this.state.user_id}`,
         num_looking_for_game: `${num_needed}`,
         location_id: `${this.state.user_info.default_location._id}`,
         start_time: `${time}`
       })
     })
     .then((response) => response.json())
     .then((responseData) => {
       console.log(responseData)
     })
     .done();

     this.props.navigator.pop();
   }


 render() {
   return (
     <View style={styles.container}>
    <ScrollView style={styles.scroll}>
     <Image source={require('../3forponglogo.png')} style={styles.logo} />

      <Text style={styles.hint}>Hint: click the date to select a new time!</Text>
       {/* display */}
       <Form
         ref="form"
         type={GameForm}
         options={options}
         style={styles.title}
         context={{locale: 'it-IT'}}
       />

      </ScrollView>

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
   marginTop: 10,
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
 hint: {
   color: 'white',
   fontSize: 14,
   marginTop: -20,
   marginBottom: 20,
   alignSelf: 'center',
   fontStyle: 'italic',
 },
 scroll: {
   flex: 1,
   marginBottom: -370,
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
   marginBottom: -20,
 }
 });

export default CreateGame;
