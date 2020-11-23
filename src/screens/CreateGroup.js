import React, { useState } from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from "firebase";
import 'firebase/firestore';
import 'firebase/storage';

function CreateGroup({ navigation }) {
  const [groupName, setGroupName] = useState('');
  const [requiredSkill, setRequiredSkill] = useState('');
  const [maxPeople, setMaxPeople] = useState('');
  const [image, setImage] = useState(null);
  const [dbURL, setDbURL] = useState('');
  const [loading, setLoading] = useState(false);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {

      setImage(result.uri);
      //setFileName(result);
    }
  };

  const uploadImage = async (uri) => {

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child(`groups/${groupName}`);

    let snapshot = await ref.put(blob);

    return await snapshot.ref.getDownloadURL();
  };

  async function uploadGroupData() {
    setLoading(true);
    await uploadImage(image).then(async (url) => {
      var user = firebase.auth().currentUser;
      let group = {
        GroupName: groupName,
        RequiredSkill: requiredSkill,
        MaximumPeople: maxPeople,
        thumbnail: url,
        createdAt: new Date().toString(),
        createdBy: user.email,
        groupMembers: [user.email],
        Messages:[]
      };

      firebase.firestore()
        .collection('Groups')
        .doc(groupName)
        .set(group)
        .then(() => {
          setLoading(false);
          setGroupName('');
          setRequiredSkill('');
          setMaxPeople('');
          setImage(null);
          setDbURL('');
        });

      Alert.alert(
        'Success',
        'Your Group has been created successfully!',
      );
    });
    setLoading(false);
  }

  return (
    <ScrollView style={styles.container}>

      <SafeAreaView style={{alignItems: 'center'}}>

        <View style={styles.withoutBoder}>
          <TouchableOpacity
            onPress={selectImage}>
            {image === null ? (
              <Image
                style={styles.avatar}
                source={require('../assets/default_group.png')}
              />
            ) : (
                <Image style={styles.avatar} source={{ uri: image }} />
              )}
          </TouchableOpacity>
        </View>

        <View style={styles.input1}>
          <TextInput
            style={styles.textinput1}
            placeholder="Group Name"
            keyboardType="default"
            value={groupName}
            underlineColorAndroid="transparent"
            onChangeText={setGroupName}
          />
        </View>

        <View style={styles.input1}>
          <TextInput
            style={styles.textinput1}
            placeholder="Add Required Skill"
            keyboardType="default"
            value={requiredSkill}
            underlineColorAndroid="transparent"
            multiline={true}
            onChangeText={setRequiredSkill}
          />
        </View>

        <View style={styles.input1}>
          <TextInput
            style={styles.textinput1}
            placeholder="Group Limit"
            keyboardType="default"
            value={maxPeople}
            underlineColorAndroid="transparent"
            multiline={true}
            onChangeText={setMaxPeople}
          />
        </View>

        <View>
          <TouchableOpacity
            disabled={loading}
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => uploadGroupData()}>
            {loading ? (
              <ActivityIndicator
                size="small"
                color="#232624"
                animating={loading}
              />
            ) : (
                <Text style={styles.loginText}>Create Group</Text>
              )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232624",
  },

  input1: {
    borderColor: '#8A8F9E',
    backgroundColor: "#232624",
    borderRadius: 4,
    borderWidth: 1,
    width: 300,
    height: 45,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'flex-start',
  },

  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 4,
  },

  loginButton: {
    backgroundColor: "white",
  },

  loginText: {
    color: "#232624",
  },

  withoutBoder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  back: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
    marginRight: 120,
  },

  avatar: {
    marginTop: 50,
    borderColor: 'white',
    borderWidth: 1,
    width: 120,
    height: 120,
    borderRadius: 63,
  },

  images: {
    fontSize: 17,
    marginRight: 20,
  },

  saved: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 7,
    textDecorationLine: 'underline',
  },

  textinput1: {
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    color: 'white'
  },

  imageBox: {
    width: 250,
    height: 200,
    alignItems: 'center',
  },
});

export default CreateGroup;
