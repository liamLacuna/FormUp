import React, { Component } from 'react';
import {
	StyleSheet, Text, View, Alert,
	TextInput, TouchableOpacity, Image, StatusBar,
	LayoutAnimation, ScrollView, ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase';

class LoginScreen extends Component {
	static navigationOptions = {
		header: null
	};

	state ={
		email: "",
		password: "",
		errorMessage: null,
		loading: false
	};

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#232624",
    },
    inputContainer: {
      backgroundColor: "#232624",
      borderColor: '#8A8F9E',
      borderRadius: 4,
      borderWidth: 1,
      width: 300,
      height: 45,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputs: {
      height: 45,
      marginLeft: 16,
      borderBottomColor: "#232624",
      color: "white",
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
  		borderRadius: 4,
      height: 45,
      width: 300,
  		alignItems: "center",
  		justifyContent: "center"
    },

    loginButton: {
      backgroundColor: "white",
    },

    loginText: {
      color: "#4e5751",
      fontWeight: "bold"
    },
  });

  export default Forgotpassword;
