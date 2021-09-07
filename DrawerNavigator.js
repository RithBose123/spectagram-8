import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import StackNavigator from "./StackNavigator"
import Profile from "../Screens/Profile"
import {createDrawerNavigator} from "@react-navigation/drawer"

const Drawer=createDrawerNavigator()
const DrawerNavigator= ()=>{
  return (
     <Drawer.Navigator   
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
     <Drawer.Screen
     name="Home " component={StackNavigator}
     />
 <Drawer.Screen
     name="Profile" component={Profile}
     />
     </Drawer.Navigator>

  )
}
export default DrawerNavigator