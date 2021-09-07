import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BottomTabNavigator from "./TabNavigator"
import PostScreen from "../Screens/postScreen"
import {createStackNavigator} from "@react-navigation/stack"
const Stack=createStackNavigator()
const StackNavigator=()=>{
  return(
    <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{headerShown:false}}
    >
    <Stack.Screen name="Home" component={BottomTabNavigator}  />
    <Stack.Screen name="PostScreen" component={PostScreen}  />
    </Stack.Navigator>
  )
}
export default StackNavigator