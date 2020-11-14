import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaViewS } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import * as firebase from "firebase";
import 'firebase/firestore';

export default function ChatScreen({ navigation }) {
	const [messages, setMessages] = useState([]);
	const groupName = navigation.getParam('groupName', 'some default value');

	const ref = firebase.firestore().collection('Groups').doc(groupName);
	var user = firebase.auth().currentUser;

	const [avatar, setAvatar] = useState(user.photoURL);

	function setUserAvatar() {

		if (avatar == null) {
			setAvatar('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&usqp=CAU');

		}
	}

	async function getMessages() {
		const doc = await ref.get();
		var Messages = doc.data().Messages;

		var chatMessages = [];

		for (var i = 0; i < Messages.length; i++) {
			chatMessages.push({
				_id: Messages[i]._id,
				text: Messages[i].text,
				createdAt: Messages[i].createdAt.toDate(),
				user: Messages[i].user,
			})
		}

		setMessages(chatMessages);
	}

	useEffect(() => {
		getMessages(),
			setUserAvatar();
	}, [])

	const onSend = useCallback(async (messages = []) => {
		setMessages(previousMessages => GiftedChat.append(messages, previousMessages));

		const res = await ref.update({
			Messages: firebase.firestore.FieldValue.arrayUnion(...messages)
		}
		);

		getMessages();

	}, [])

	return (
		<View style={{ flex: 1, backgroundColor: '#232624'}}>
			<View style={{ backgroundColor: 'white', marginTop: 30, borderRadius: 15  }}>
				<Text style = {styles.titleText}>{groupName}</Text>
			</View>
			<GiftedChat
				inverted={false}
				messages={messages}

				onSend={messages => onSend(messages)}
				user={{
					_id: user.uid,
					name: user.displayName,
					avatar: avatar,
				}}

				renderUsernameOnMessage
				renderAvatarOnTop
				messagesContainerStyle={{ backgroundColor: '#232624' }}
				alignTop
				alwaysShowSend
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	titleText: {
		fontSize: 18,
		padding: 15,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#232624',
	},
});