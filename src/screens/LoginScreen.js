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

	handleLogin = () => {
		const { email, password } = this.state;
		this.setState({ loading: true });

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.catch(error => this.setState({ errorMessage: error.message, loading: false }));
	};

	restore_password = () => {
		if (this.state.email == '') {
			Alert.alert('Alert', 'Enter email address.');
		} else {
			var emailAddress = this.state.email.toLowerCase();

			firebase.auth()
			.sendPasswordResetEmail(emailAddress)
				.then(function () {
					Alert.alert(
						'Alert',
						'A link has been sent to your email address to reset your password.',
					);
				})
				.catch(function (error) {
					Alert.alert('Error', error.message);
				});
		}
	}

	render() {
		LayoutAnimation.easeInEaseOut();

		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content"></StatusBar>
				<Image
					source={require("../assets/FormUpLogo.png")}
					style={{ marginTop: 130, alignSelf: "center" }}
				></Image>

				<Text style={styles.greeting}>{`Welcome Back`}</Text>

				<View style={styles.errorMessage}>
					{this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
				</View>

				<View style={styles.form}>
					<View>
						<Text style={styles.inputTitle}> Email </Text>
						<TextInput 
							style={styles.input}
							autoCapitalize="none"
							onChangeText={email => this.setState({ email })}
							value={this.state.email}
						></TextInput>
					</View>

					<View style={styles.passwordField}>
						<Text style={styles.inputTitle}> Password </Text>
						<TextInput 
							style={styles.input}
							autoCapitalize="none"
							onChangeText={password => this.setState({ password })}
							value={this.state.password}
						></TextInput>
					</View>
				</View>

				<TouchableOpacity style={styles.signIn} onPress={this.handleLogin}>
					<Text style={styles.signInText}>Sign In</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={this.restore_password}>
					<Text style={styles.forgot}>Forgot Password?</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.signUp} 
					onPress={() => this.props.navigation.navigate("Register")}
				>
					<Text style={styles.signUpLabel}>
						New to FormUp ?
						<Text styles={styles.signUpText}>Sign Up</Text>
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
    backgroundColor: '#fff',
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center"
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  error: {
    color: "#E9446a",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase"
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D"
  },
  passwordField: {
    marginTop: 32
	},
	signIn: {
		marginHorizontal: 30,
		backgroundColor: "#E9446A",
		borderRadius: 4,
		height: 52,
		alignItems: "center",
		justifyContent: "center"
	},
	signInText: {
		color: "#fff",
		fontWeight: "500"
	},
	signUp: {
		alignSelf: "center",
		marginTop: 32
	},
	signUpLabel: {
		color: "#414959",
		fontSize: 13
	},
	signUpText: {
		fontWeight: "500",
		color: "#E9446A"
	},
	forgot: {
		textAlign: "center",
		marginTop: 10,
		color: "#E9446A",
	},
});

export default LoginScreen