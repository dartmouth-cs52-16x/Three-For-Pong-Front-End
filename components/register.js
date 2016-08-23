import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight,
  AlertIOS,
  Dimensions,
} from 'react-native';
import t from 'tcomb-form-native';
import _ from 'lodash';


let Form = t.form.Form;

// here we are: define your domain model

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

var Person = t.struct({
  FirstName: t.String,
  LastName: t.String,            // a required string
  phoneNumber: t.String,
  email: t.String,  // an optional string
  password: t.String,               // a required number
  confirmPassword: t.String,        // check if password is correct
  canHost: t.Boolean // Boolean

});


// overriding the text color
stylesheet.textbox.normal.color = '#FFFFFF';
stylesheet.textbox.normal.borderRadius = 0;
stylesheet.textbox.normal.borderLeftColor = '#1B676B';
stylesheet.textbox.normal.borderRightColor = '#1B676B';
stylesheet.textbox.normal.borderTopColor = '#1B676B';

let options = {
  fields: {
    Locations: {}
  }
}; // optional rendering options (see documentation)

// optional rendering options (see documentation)


class Register extends Component {
  constructor(props){
   super(props);
   this.state = {
      options: options,
      dict: {},
      value: {},
      type: Person
    };

    this.onChange = this.onChange.bind(this);
    //this.createForm = this.createForm.bind(this);
 }

 componentWillMount() {
   this.buildLocations();
 }

 onChange(value) {

   console.log(value);
   if (value.canHost) {
     var location_dict = this.state.dict;
     var LocationList = t.enums(location_dict, 'LocationList');

     var temp = t.struct({
       FirstName: t.String,
       LastName: t.String,            // a required string
       phoneNumber: t.String,
       email: t.String,  // an optional string
       password: t.String,               // a required number
       confirmPassword: t.String,        // check if password is correct
       canHost: t.Boolean, // Boolean
       LocationToHost: LocationList

     });

     this.setState({type: temp, value: value});
   } else {
      var temp = t.struct({
        FirstName: t.String,
        LastName: t.String,            // a required string
        phoneNumber: t.String,
        email: t.String,  // an optional string
        password: t.String,               // a required number
        confirmPassword: t.String,        // check if password is correct
        canHost: t.Boolean // Boolean
      });

      this.setState({type: temp, value: value});
   }

   }

  buildLocations() {
    var dict = {};
    fetch('https://threeforpong.herokuapp.com/api/locations/', {
      method: 'GET'
    })

    .then((response) => response.json())
    .then((responseData) => {

      for(var i = 0; i < responseData.length; i++) {
        var loc_temp = responseData[i].location_name.replace(/"/g, "'")
        dict[responseData[i].location_id] = responseData[i].location_name
      }
      this.getType(dict);
      //const LocationList = t.enums.of([data_string], 'LocationList');

    })

  }

  getType(location_dict){
    var LocationList = t.enums(location_dict, 'LocationList');

    var foo = t.struct({
      FirstName: t.String,
      LastName: t.String,            // a required string
      phoneNumber: t.String,
      email: t.String,  // an optional string
      password: t.String,               // a required number
      confirmPassword: t.String,        // check if password is correct
      canHost: t.Boolean // Boolean

    });
    this.setState({type:foo, dict:location_dict});


  }
  onPress() {
    var value = this.refs.form.getValue();
    if (value) {
      console.log(value);
    }
  }

   render() {
     return (
       <View style={styles.container}>
        <ScrollView>
         {/* display */}
         <Form
           ref="form"
           type={this.state.type}
           options={this.state.options}
           value={this.state.value}
           style={styles.title}
           onChange={this.onChange}
         />

         <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
           <Text style={styles.buttonText}>REGISTER</Text>
         </TouchableHighlight>
         </ScrollView>
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     marginTop: 50,
     padding: 20,
     backgroundColor: 'darkgreen',
   },
   title: {
     fontSize: 30,
     alignSelf: 'center',
     marginBottom: 30,
     color: 'white',
   },
   buttonText: {
     fontSize: 18,
     color: 'white',
     alignSelf: 'center'
   },
   button: {
     height: 36,
     backgroundColor: '#48BBEC',
     borderColor: '#48BBEC',
     borderWidth: 1,
     borderRadius: 8,
     marginBottom: 10,
     alignSelf: 'stretch',
     justifyContent: 'center'
   }
 });

export default Register;
