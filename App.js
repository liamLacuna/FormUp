import { StatusBar } from 'expo-status-bar';
import React, { Component }from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { creatStackNavigator, createStackNavigator } from "react-navigation-stack";

import LoginScreen from './src/screens/LoginScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';

import firebase from 'firebase';
import { firebaseConfig } from './src/config';

// if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
// }

const AppStack = createStackNavigator({
  Dashboard: DashboardScreen
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
});

export default function App() {
  return (
    <AppNavigator />
  );
}

const AppSwitchNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "Auth"
  }
) 

const AppNavigator = createAppContainer(AppSwitchNavigator)
