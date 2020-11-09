import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  FlatList
} from "react-native";
import { Icon } from "react-native-elements";
import { Container, Content, Accordion } from "native-base";
import Loading from "./components/Loading";
import * as firebase from "firebase";
import "firebase/firestore";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      loading: false,
    };
  }

  async registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        enableVibrate: true,
      });
    }

    var user = firebase.auth().currentUser;
    const ref = firebase.firestore().collection("UserTokens");
    await ref.doc(user.email).set({
      token: token,
    });
  }

  async allGroups() {
    this.setState({ loading: true });
    const ref = firebase.firestore().collection("Groups");
    await ref.onSnapshot(async (querySnapshot) => {
      const temp = [];
      await querySnapshot.docs.forEach((doc) => {
        temp.push({
          name: doc.data().GroupName,
          requiredSkill: doc.data().RequiredSkill,
          maxPeople: doc.data().MaximumPeople,
          admin: doc.data().createdBy,
          time: doc.data().createdAt,
          image: doc.data().thumbnail,
        });
      });
      this.setState({ dataArray: temp, loading: false });
    });
  }

  async componentDidMount() {
    this.allGroups();
    await this.registerForPushNotificationsAsync();
  }

  _renderHeader(item, expanded) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
          backgroundColor: "#232624",
        }}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 3 }}>
            <Image
              style={{ height: 70, width: 70 }}
              resizeMode="contain"
              source={{ uri: item.image }}
            />
          </View>

          <View style={{ flex: 6 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                margin: 10,
                marginLeft: 10,
                color: "#FFFFFF",
              }}
            >
              {item.name}
            </Text>
          </View>

          <View style={{ flex: 1, marginTop: 20 }}>
            {expanded ? (
              <Icon
                type="MaterialIcons"
                iconStyle={{ color: "#FFFFFF" }}
                name="remove-circle"
              />
            ) : (
              <Icon
                type="MaterialIcons"
                iconStyle={{ color: "#FFFFFF" }}
                name="add-circle"
              />
            )}
          </View>
        </View>
      </View>
    );
  }
  _renderContent(item) {
    return (
      <View>
        <Text style={(styles.description, styles.bold)}>Group Admin: </Text>
        <Text style={styles.description}>{item.admin} </Text>

        <Text style={(styles.description, styles.bold)}>Created At: </Text>
        <Text style={styles.description}>{item.time} </Text>

        <Text style={(styles.description, styles.bold)}>Required Skill: </Text>
        <Text style={styles.description}>{item.requiredSkill} </Text>

        <Text style={(styles.description, styles.bold)}>
          Maximum People Allowed:{" "}
        </Text>
        <Text style={styles.description}>{item.maxPeople} </Text>

        <View style={{ alignItems: "center", backgroundColor: "#3e4540" }}>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.joinButton]}
            onPress={() => joinGroup(item.name, item.admin)}
          >
            <Text style={styles.joinText}>Join Group</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={require("../assets/FormUpLogo.png")}
            style={{ marginTop: 50, alignSelf: "center" }}
          ></Image>
        </View>

        <Loading loading={this.state.loading} />

        <View style={styles.title}>
          <Text style={styles.titleText}>Groups for you</Text>
        </View>

        <View style={styles.list}>
          <Container style={{ backgroundColor: "#232624" }}>
            <Content padder>
              <Accordion
                dataArray={this.state.dataArray}
                animation={true}
                expanded={true}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
              />
            </Content>
          </Container>
        </View>

        <View style={styles.back}>
          <TouchableOpacity>
            <Icon
              type="content"
              name="add-circle"
              size={60}
              iconStyle={styles.addButton}
              onPress={() => this.props.navigation.navigate("Group")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

async function sendPushNotification(expoPushToken, groupName) {
  var user = firebase.auth().currentUser;

  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Group Joined Notification",
    body: `${user.displayName} has joined your group ${groupName}`,
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

function isUserExists(members, user) {
  for (var i = 0; i < members.length; ) {
    if (user.email == members[i]) {
      return true;
    } else {
      i++;
    }
  }

  return false;
}

async function joinGroup(groupName, admin) {
  const ref = firebase.firestore().collection("Groups").doc(groupName);
  const doc = await ref.get();

  var user = firebase.auth().currentUser;
  var members = doc.data().groupMembers;

  if (members.length == doc.data().MaximumPeople) {
    alert("Group limit has reached, you cannot join.");
  } else if (isUserExists(members, user)) {
    alert("You are already in this group.");
  } else {
    await ref.update({
      groupMembers: firebase.firestore.FieldValue.arrayUnion(user.email),
    });

    const tokenRef = firebase.firestore().collection("UserTokens").doc(admin);
    const tokenDoc = await tokenRef.get();

    const expoPushToken = tokenDoc.data().token;

    sendPushNotification(expoPushToken, groupName);

    Alert.alert("Success", "You have joined group successfully.");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: -10,
    backgroundColor: "#232624",
  },

  back: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: -0,
  },

  saved: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 7,
  },

  list: {
    flex: 1,
    marginRight: -5,
    marginLeft: -5,
    marginTop: -10,
  },

  description: {
    backgroundColor: "#3e4540",
    padding: 10,
    fontStyle: "italic",
    color: "white",
  },

  bold: {
    backgroundColor: "#3e4540",
    padding: 10,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
  },

  backgroundColor: {
    backgroundColor: "#3e4540",
    alignItems: "center",
  },

  tinyLogo: {
    width: 270,
    height: 200,
  },

  title: {
    alignItems: "center",
    margin: 10,
    marginTop: -10,
    padding: 8,
  },

  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center",
    marginRight: 30,
    marginLeft: 30,
    color: "white",
  },

  addButton: {
    color: "#E9446A",
    margin: 8,
  },

  buttonContainer: {
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 100,
    borderRadius: 4,
  },

  joinButton: {
    backgroundColor: "white",
  },

  joinText: {
    color: "#232624",
  },
});

export default DashboardScreen;
