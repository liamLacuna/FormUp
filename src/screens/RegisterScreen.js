import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import * as ImagePicker from 'expo-image-picker';

export default class RegisterScreen extends React.Component {
	static navigationOptions = {
		header: null
	};
    
	state = {
		name: "",
		email: "",
		password: "",
		image: null,
		errorMessage: null,
		loading: false
	};

	handleSignUp = () => {
		this.setState({ loading: true });
		firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(userCredentials => {
				return userCredentials.user.updateProfile({
					displayName: this.state.name,
					photoURL: this.state.image
				});
			})
			.catch(error => this.setState({
				errorMessage: error.message,
				loading: false
			}));

	};

	pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		// console.log(result);

		if (!result.cancelled) {
			{
				this.setState({
					image: result.uri
				});
			}
		}
	};

	render() {
		return (
			<ScrollView style={styles.container}>
				<TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
						<Ionicons name="ios-arrow-round-back" size={32} color="#FFF"></Ionicons>
				</TouchableOpacity>

				<View style={{ position: "absolute", alignItems: "center", width: "100%" }}>
					<Text style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text>

					<TouchableOpacity onPress={this.pickImage}>

						{this.state.image === null ? (
							<Image
								style={styles.avatar}
								source={require('../assets/profile.png')}
							/>

						) : (
								<Image style={styles.avatar} source={{ uri: this.state.image }} />
							)}

					</TouchableOpacity>
				</View>

				<View style={styles.errorMessage}>
					{this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
				</View>

				<View style={styles.form}>
					<View>
						<Text style={styles.inputTitle}>Full Name</Text>
						<TextInput
							style={styles.input}
							autoCapitalize="none"
							onChangeText={name => this.setState({ name })}
							value={this.state.name}
						></TextInput>
					</View>

					<View style={{ marginTop: 32 }}>
						<Text style={styles.inputTitle}>Email Address</Text>
						<TextInput
							style={styles.input}
							autoCapitalize="none"
							onChangeText={email => this.setState({ email })}
							value={this.state.email}
						></TextInput>
					</View>

					<View style={{ marginTop: 32 }}>
						<Text style={styles.inputTitle}>Password</Text>
						<TextInput
							style={styles.input}
							secureTextEntry
							autoCapitalize="none"
							onChangeText={password => this.setState({ password })}
							value={this.state.password}
						></TextInput>
					</View>
				</View>

				<TouchableOpacity
					disabled={this.state.loading}
					style={styles.button}
					onPress={this.handleSignUp}>
					{this.state.loading ? (
						<ActivityIndicator size="small" color="#000000" animating={this.state.loading} />
					) : (
							<Text style={{ color: "#000000", fontWeight: "500" }}>Sign up</Text>
						)}
				</TouchableOpacity>

				<TouchableOpacity
					style={{ alignSelf: "center", marginTop: 32 }}
					onPress={() => this.props.navigation.navigate("Login")}
				>
					<Text style={{ fontSize: 13 }}>
						Already have a account?
						<Text style={{ fontWeight: "500", color: "#E9446A" }}> Login</Text>
					</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	greeting: {
		marginTop: 100,
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
		color: "#E9446A",
		fontSize: 13,
		fontWeight: "600",
		textAlign: "center"
	},
	form: {
		marginBottom: 48,
		marginHorizontal: 30,
		marginTop: 280
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
	button: {
		marginHorizontal: 30,
		backgroundColor: "#E9446A",
		borderRadius: 4,
		height: 52,
		alignItems: "center",
		justifyContent: "center"
	},
	back: {
		position: "absolute",
		top: 48,
		left: 32,
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: "rgba(21, 22, 48, 0.1)",
		alignItems: "center",
		justifyContent: "center"
	}, 
	avatar: {
		width: 100,
		height: 100,
		backgroundColor: "#E1E2E6",
		borderRadius: 50,
		marginTop: 48,
		justifyContent: "center",
		alignItems: "center"
	}
});
