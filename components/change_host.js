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

//let token = storage.get('token');

var Person = t.struct({
  canHost: t.Boolean
});

let options = {
  fields: {
    LocationToHost: {
      selectionColor: '#f7f7f7',
      nullOption: {value: '', text: 'Choose your location'}
    }
  }
}
let values = {};


class changeHost extends Component {

  constructor(props){
   super(props);
   this.state = {
      user_id: this.props.user_id,
      user_info: this.props.user_info,
      location_dict: this.props.location_dict,
      value: values,
      options: options,
      type: Person
    };

    this.loadHostForm = this.loadHostForm.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  componentWillMount() {
    this.loadHostForm();
  }

  loadHostForm() {
    if (this.state.user_info.canHost) {
      var LocationList = t.enums(this.props.location_dict, 'LocationList');
      var foo = t.struct({
        canHost: t.Boolean, // Boolean
        LocationToHost: LocationList

      });
      var temp_val = {
        canHost: this.state.user_info.canHost,
        LocationToHost: this.state.user_info.default_location._id
      };

      this.setState({type: foo, value:temp_val});
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
      this.setState({type: foo, value: value});

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
