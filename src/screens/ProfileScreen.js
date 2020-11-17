import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Icon, Button } from "react-native-elements";
import DialogInput from "react-native-dialog-input";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import Loading from "./common/Loading";

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Loading loading={loading} />

      <View style={{ marginTop: 30, alignItems: "flex-end", marginRight: 20 }}>
        <Button
          icon={
            <Icon
              type="material-community"
              name="logout"
              size={20}
              color="white"
            />
          }
          iconRight
          title="Logout "
          titleStyle={{ color: "white" }}
          buttonStyle={{ backgroundColor: "#232624" }}
          onPress={() =>
            Alert.alert("Log Out", "Are you sure you want to log out?", [
              {
                text: "Yes",
                onPress: () =>
                  firebase
                    .auth()
                    .signOut()
                    .then(() => {
                      navigation.navigate("Home");
                    })
                    .catch(function (error) {
                      Alert.alert("Error", error.message);
                    }),
                style: "cancel",
              },
              { text: "No", onPress: () => console.log("No Pressed") },
            ])
          }
        />
      </View>

      <View style={styles.header}>
        <View>
          <TouchableOpacity onPress={pickImage}>
            {photo === null ? (
              <Image
                style={styles.avatar}
                source={require("../assets/profile.png")}
              />
            ) : (
              <Image style={styles.avatar} source={{ uri: photo }} />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.name}>{name}</Text>
          <Icon
            type="AntDesign"
            name="edit"
            size={15}
            iconStyle={styles.nameEdit}
            // onPress={() => setNameEdit(true)}
          />
        </View>
      </View>
      <View style={styles.bodyContent}>
        <View style={styles.emailContainer}>
          <View style={styles.iconRow}>
            <Icon
              name="email"
              underlayColor="transparent"
              color="white"
              size={20}
            />
          </View>
          <View style={styles.emailRow}>
            <Text style={styles.emailText}>{email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.links}>
        <TouchableOpacity
          style={styles.reset}
        //   onPress={() => navigation.navigate("Reset")}
        >
          <Text style={styles.resetText}>Reset password</Text>
        </TouchableOpacity>

        <DialogInput
          isDialogVisible={isDialogVisible}
          title={"Reset Password"}
          hintInput={"Enter New Password"}
        //   submitInput={(inputText) => resetPassword(inputText)}
        //   closeDialog={() => hideDialog()}
        />

        <DialogInput
          isDialogVisible={nameEdit}
          title={"Change Name"}
          hintInput={"Enter New Name"}
        //   submitInput={(inputText) => changeName(inputText)}
        //   closeDialog={() => setNameEdit(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
