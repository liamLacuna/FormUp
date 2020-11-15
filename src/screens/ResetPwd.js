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
  function Forgotpassword({navigation}) {
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [loading, setLoading] = useState(false);

    // Reauthenticates the current user
    const reauthenticate = (currentPassword) => {
      let user = firebase.auth().currentUser;
      let cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
      return user.reauthenticateWithCredential(cred);
    };
    // Changes user password
    const onChangePasswordPress = () => {
      if (currentPwd.length !== 0 && newPwd.length !== 0) {
        setLoading(true);
        reauthenticate(currentPwd)
          .then(() => {
            let user = firebase.auth().currentUser;
            user
              .updatePassword(newPwd)
              .then(() => {
                setLoading(false);
                Alert.alert('Success', 'Password changed');
                navigation.goBack();
              })
              .catch((error) => {
                setLoading(false);
                Alert.alert('Error', error.message);
              });
          })
          .catch((error) => {
            setLoading(false);
            Alert.alert('Error', error.message);
            console.log(error.message);
          });
      } else {
        Alert.alert('Error', 'Empty not allow');
      }
    };
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Current Password"
            value={currentPwd}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={setCurrentPwd}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="New Password"
            secureTextEntry={true}
            value={newPwd}
            underlineColorAndroid="transparent"
            onChangeText={setNewPwd}
          />
        </View>
  }
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
