import { StatusBar } from 'expo-status-bar';
import React, { Component }from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { creatStackNavigator, createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from './src/screens/LoginScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MessageScreen from './src/screens/MessageScreen';
import NotificationScreen from './src/screens/NotificationScreen';

import firebase from 'firebase';
import { firebaseConfig } from './src/config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppTabNavigator = createBottomTabNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor} />
    }
  },
  Message: {
    screen: MessageScreen,
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-chatboxes" size={24} color={tintColor} />
    }
  },
  Notification: {
    screen: NotificationScreen,
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-notifications" size={24} color={tintColor} />
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor} />
    }
  }
},
{
  tabBarOptions: {
    activeTintColor: "#161F3D",
    inactiveTintColor: "#B8BBC4",
    showLabel: false
  }
}
);

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
    App: AppTabNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: "Loading"
  }
) 

const AppNavigator = createAppContainer(AppSwitchNavigator)
