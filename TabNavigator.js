import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Profile from '../Screens/Profile';
import Feed from '../Screens/Feed';
import CreatePost from '../Screens/CreatePost';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
const Tab = createMaterialBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      labeled={false}
      barStyle={styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focussed, color, size }) => {
          let iconName;
          if (route.name === 'Feed') {
            iconName = focussed ? 'home' : 'home-outline';
          } else if (route.name === 'CreatePost') {
            iconName = focussed ? 'add-circle' : 'add-circle-outline';
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              style={styles.icons}
            />
          );
        },
      })}
      activeColor="tomato"
      inactiveColor="gray">
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="CreatePost" component={CreatePost} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: '#2f345d',
    height: '8%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    position: 'absolute',
  },
  icons: { width: RFValue(30), height: RFValue(30) },
});
export default BottomTabNavigator;
