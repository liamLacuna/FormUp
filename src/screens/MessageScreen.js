import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
} from "react-native";
//import Constants from 'expo-constants';
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import "firebase/firestore";

export default function MessageScreen({ navigation }) {
  const [data, setData] = useState([null]);

  const ref = firebase.firestore().collection("Groups");

  const DATA = [
    {
      data: data,
    },
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  async function getMyGroups() {
    var user = firebase.auth().currentUser;
    await ref
      .where("groupMembers", "array-contains", user.email)
      .onSnapshot(async (querySnapshot) => {
        const temp = [];
        await querySnapshot.docs.forEach((doc) => {
          var next = doc.data().GroupName;
          temp.push(next);
        });
        setData(temp);
      });
  }

  useEffect(() => {
    getMyGroups();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topTitle}>
        <Text style={styles.titleText}>My Groups</Text>
      </View>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Chat", { groupName: item })}
          >
            <Item title={item} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232624",
  },
  item: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 6,
    borderRadius: 15,
  },
  title: {
    fontSize: 15,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    backgroundColor: "#fff",
  },
  topTitle: {
    alignItems: "center",
    marginTop: 30,
    padding: 8,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});
