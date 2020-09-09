import React, { Component }from 'react';
import { StyleSheet, Text, View } from 'react-native';

class DashboardScreen extends Component {
	state = {
		email: "",
		displayName: ""
	};

	componentDidMount() {
		const { email, displayName } = firebase.auth().currentUser;

		this.setState({ email, displayName });
	}

	signOutUser = () => {
		firebase.auth().signOut();
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Hi {this.state.email}!</Text>

				<TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
					<Text>Logout</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DashboardScreen
