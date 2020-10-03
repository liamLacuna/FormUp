import React, { Component }from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import * as firebase from 'firebase'

class DashboardScreen extends Component {
	state = {
		email: "",
		displayName: ""
	};

	componentDidMount() {
		const { email, displayName } = firebase.auth().currentUser;

		this.setState({ email, displayName });
	}

	// signOutUser = () => {
	// 	firebase.auth().signOut();
	// };

	render() {
		return (
			<View style={styles.container}>
				{/* <Text style={styles.dashboard_welcome}>Hi {this.state.displayName}!</Text> */}

				{/* <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
					<Text>Logout</Text>
				</TouchableOpacity> */}

				<TouchableOpacity style={styles.featured_group}>
					<View style={styles.feature_card}>
						<Text style={styles.ad}>Featured</Text>
						<Text>FormUp</Text>
						<Text>Required React native</Text>

						<Text>Yang Li | 1 Hour </Text>
					</View>
				</TouchableOpacity>

				<View style={styles.rec_group}>
					<Text>Recommendations</Text>
				</View>
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  featured_group: {
	flex: 1,
	width: '100%',
	height: '100%',
  },
  feature_card: {
	top: 200,
	left: 100
  },
  ad: {
	width: '18%',
	padding: 5,
	borderWidth: 1,
	borderColor: '#000000',
	borderRadius: 15
  },
  rec_group: {
	flex: 1
  }

});

export default DashboardScreen
