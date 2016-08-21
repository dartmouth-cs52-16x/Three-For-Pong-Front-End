import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';
import t from 'tcomb-form-native';

let Form = t.form.Form;



// here we are: define your domain model
let Person = t.struct({
  FirstName: t.String,
  LastName: t.String,            // a required string
  phoneNumber: t.String,
  email: t.String,  // an optional string
  password: t.String,               // a required number
  confirmPassword: t.String,        // check if password is correct
  canHost: t.Boolean // Boolean

});

let options = {
  fields: {
    Locations: {}
  }
}; // optional rendering options (see documentation)

class Register extends Component {
  constructor(props){
   super(props);
   this.state = {
      options: options,
      value: null
   };
 }

  onChange() {

    if (Person.canHost) {
      fetch('https://threeforpong.herokuapp.com/api/locations/')
      .then((response) => response.json())
      .then((responseData) => {
        var data = [];
        for(var i = 0; i < responseData.length; i++) {
          data.push(responseData[i]);
        }
      })

      let Locations = t.enums ({
        data : data
      });
      return t.struct({
        LocationtoHost: Locations,
      });
    };
  }

  getInitialValue() {
     const value = {};
     return { value, type: this.getType(value) };
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
         {/* display */}
         <Form
           ref="form"
           type={Person}
           options={this.state.options}
           style={styles.title}
           onChange={this.onChange}
         />

         <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
           <Text style={styles.buttonText}>Save</Text>
         </TouchableHighlight>
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