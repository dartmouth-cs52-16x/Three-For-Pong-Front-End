import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  ScrollView,
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
import t from 'tcomb-form-native';

var Form = t.form.Form;

var token = storage.get('token');

var Person = t.struct({
  canHost: t.Boolean
});
var options = {
  auto: 'placeholders',
  fields: {
    LocationToHost: {
      selectionColor: '#f7f7f7',
      error:'Please choose a valid location',
      nullOption: {value: '', text: 'Choose your location'}
    },
  }


}; // optional rendering options (see documentation)


var values = {};

class changeHost extends Component {

  constructor(props){
   super(props);
   this.state = {
      user_id: this.props.user_id,
      user_info: this.props.user_info,
      location_dict: this.props.location_dict,
      value: values,
      options: {},
      token:`${token._65}`,
      buttonText:"RETURN TO SETTINGS",
      type: Person
    };

    this.loadHostForm = this.loadHostForm.bind(this);
    this.onChange = this.onChange.bind(this);
    this._onPress = this._onPress.bind(this);

  }

  componentWillMount() {
    this.loadHostForm();
  }

  loadHostForm() {
    console.log(this.state.user_info);
    var options = {
      auto: 'placeholders',
      fields: {
        LocationToHost: {
          selectionColor: '#f7f7f7',
          error:'Please choose a valid location',
          nullOption: {value: '', text: 'Choose your location'}
        },
      }


    };
    if (this.state.user_info.can_host) {
      var LocationList = t.enums(this.props.location_dict, 'LocationList');
      var foo = t.struct({
        canHost: t.Boolean, // Boolean
        LocationToHost: LocationList

      });
      var temp_val = {
        canHost: this.state.user_info.can_host,
        LocationToHost: this.state.user_info.default_location._id
      };

      this.setState({type: foo, value:temp_val, options: options});

    }


  }

  onChange(value) {
      if(value.canHost){
        var LocationList = t.enums(this.props.location_dict, 'LocationList');
        var foo = t.struct({
          canHost: t.Boolean, // Boolean
          LocationToHost: LocationList

        });


      }
      else {

        var foo = t.struct({
          canHost: t.Boolean

        });

        this.setState({type: foo});
      }
      this.setState({type: foo, value: value, buttonText:"UPDATE HOSTING", options: options});
  }


  _onPress() {
    var value = this.refs.form.getValue();
    if (!value) {
      return null;
    }
    var user_canHost = value.canHost;
    var user_LocationID = null;

    if(user_canHost) {
      user_LocationID = value.LocationToHost;
      console.log(`the world is ${user_canHost}, ${user_LocationID}, ${this.state.user_id}`);
      fetch(`https://threeforpong.herokuapp.com/api/users/${this.state.user_id}`, {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token._65}`
        },
        body: JSON.stringify({
          can_host: user_canHost,
          default_location_id: `${user_LocationID}`
        })
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) =>{
        console.log(error);
      })

  } else {
    fetch(`https://threeforpong.herokuapp.com/api/users/${this.state.user_id}`, {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token._65}`
      },
      body: JSON.stringify({
        can_host: user_canHost
      })
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  var user_info = {};
  var user_id = this.state.user_id;
  fetch(`https://threeforpong.herokuapp.com/api/users/${user_id}`, {
    method:'GET',
    headers: {
      'Authorization': `${token._65}`
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    user_info = responseData;
    this.props.navigator.push({
      title: 'Settings',
      component: Settings,
      passProps: {user_id: user_id, user_info: user_info}
    });
  })
  .catch((error) => {
    console.log(error);
  })
}

  render() {
    return (
      <View style={styles.container}>

      <ScrollView style={styles.scroll}>

      <Image source={require('../3forponglogo.png')} style={styles.logo} />

        {/* display */}
        <Form
          ref="form"
          type={this.state.type}
          value={this.state.value}
          option={this.state.options}
          style={styles.title}
          onChange={this.onChange}
        />

      </ScrollView>
      <TouchableHighlight style={styles.button} onPress={this._onPress} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>{this.state.buttonText}</Text>
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
    marginTop: 50,
    marginBottom: 60,
    alignSelf: 'center',
  },
  scroll: {
    flex: 1,
    marginBottom: -370,
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
    marginBottom: -20,
  }
  });

  export default changeHost;
