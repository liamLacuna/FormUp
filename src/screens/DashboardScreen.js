import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DashboardScreen = props => {
    return (
        <View style={styles.container}>
            <Text>DashBoard screen</Text>
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

export default DashboardScreen
