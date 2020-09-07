import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const LoginScreen = props => {
    return (
        <View style={styles.container}>
            <Button 
                title='Sign in with Google' 
                onPress = {() => alert('button pressed')}
            />
        </View> 
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen
