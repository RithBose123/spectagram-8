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
import {NavigationContainer} from "@react-navigation/native"
import DrawerNavigator from "../Navigation/DrawerNavigator"

export default class Dashboard extends Component {
  render() {
    return(
      <NavigationContainer>
    <DrawerNavigator/>
    </NavigationContainer>
    )
  }
}
