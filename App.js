import React,{Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';


import firebase from "firebase"
import {firebaseConfig} from "./config"
import {createAppContainer,createSwitchNavigator} from "react-navigation"
import Loading from "./Screens/loading"
import Login from "./Screens/login"
import Dashboard from "./Screens/dashboard"
const SwitchNavigator=createSwitchNavigator({
  Loading:Loading,
  Login:Login,
  Dashboard:Dashboard
})
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const AppNavigator = createAppContainer(SwitchNavigator);

export default function App() {
  return <AppNavigator />;
}


