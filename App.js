import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from './src/screens/LoginScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MessageScreen from './src/screens/MessageScreen';
import ChatScreen from './src/screens/ChatScreen';
import ResetPwd from './src/screens/ResetPwd';
import CreateGroup from './src/screens/CreateGroup';

import firebase from 'firebase';
import { firebaseConfig } from './env/config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Reset: ResetPwd
},
{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});

const DashboardStack = createStackNavigator({
  Dashboard: DashboardScreen,
  Group: CreateGroup
},
{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});

const ChatingScreen = createStackNavigator({
  Message: MessageScreen,
  Chat: ChatScreen,
},
{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
}
);

const AppTabNavigator = createBottomTabNavigator({
  Dashboard: {
    screen: DashboardStack,
    navigationOptions: { 
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor} />
    }
  },
  Message: {
    screen: ChatingScreen,
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-chatboxes" size={24} color={tintColor} />
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor} />
    }
  }
},
{
  tabBarOptions: {
    activeTintColor: "white",
    inactiveTintColor: "#4e5751",
    showLabel: true,
    activeBackgroundColor: "#232624",
    inactiveBackgroundColor: "#232624"
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
