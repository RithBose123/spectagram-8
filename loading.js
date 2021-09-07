import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import firebase from "firebase"

export default class Loading extends Component {
    checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('Dashboard');
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  };
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  render() {
    return(
      <Text>Loading</Text>
    )
  }
}
