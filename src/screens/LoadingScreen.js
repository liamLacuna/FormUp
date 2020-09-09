import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import * as firebase from 'firebase'

class LoadingScreen extends Component {
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
				this.props.navigation.navigate(user ? "App" : "Auth");
		});
}

	render(){
		return (
			<View style={styles.container}>
				<Text style={styles.loading}>Loading...</Text>
				<ActivityIndicator size="large" />
			</View> 
		);
	}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
	},
	loading: {
		color: '#ffffff'
	}
});

export default LoadingScreen
