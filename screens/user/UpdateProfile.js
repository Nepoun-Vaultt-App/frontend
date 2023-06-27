import { StatusBar } from 'expo-status-bar';

import {
	StyleSheet,
	Text,
	View,
	Image,
	Alert,
	Pressable,
	TextInput
} from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState } from 'react';
import axios from 'axios';

export default function UpdateProfile({ navigation }) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const route = useRoute()
	const userId = route.params?.id

	const handleSubmit = async () => {
		try {
			await axios.put('http://192.168.113.241:5000/update', {
				_id: userId,
				TABLE_ID: 1,
				username: username,
				password: password,
				email: email,
				friendList: [],
				gameList: []
			})
			Alert.alert("Atualização feita com sucesso!")
			navigation.navigate("Home")
		} catch (error) {
			console.log(data)

			console.log(error)
		}
	}
	return (
		<View style={styles.container}>
			<Image source={require('../../assets/chest.png')} style={styles.chestMainIcon} />
			<Text style={styles.title}>Insira os novos dados</Text>

			<Text style={styles.inputLabel}>Usuario</Text>
			<TextInput
				style={styles.input}
				value={username}
				onChangeText={setUsername}
				autoCapitalize={"none"}
			/>
			<Text style={styles.inputLabel}>Senha</Text>
			<TextInput
				style={styles.input}
				value={password}
				secureTextEntry
				onChangeText={setPassword}
			/>

			<Text style={styles.inputLabel}>Email</Text>
			<TextInput
				style={styles.input}
				value={email}
				onChangeText={setEmail}
			/>

			<Pressable onPress={handleSubmit} style={buttonStyle.button}>
				<Text style={buttonStyle.text}>Atualizar</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2B2B45',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: 50
	},
	chestMainIcon: {
		width: 100,
		height: 100,
		marginTop: 56,
	},
	title: {
		fontFamily: '',
		marginTop: -15,
		fontSize: 24,
		color: 'white'
	},
	subtitle:
	{
		fontFamily: '',
		marginTop: 0,
		fontSize: 14,
		color: '#686F99',
		paddingBottom: 15
	},
	signInButton: {
		marginTop: 1
	},
	input: {
		height: 40,
		marginBottom: 10,
		backgroundColor: '#2B2B45',
		borderColor: '#2B2B45',
		borderBottomColor: '#e0e0e0',
		borderWidth: 2,
		borderRadius: 0,
		width: "80%",
		color: "#ffffff"
	},
	inputLabel: {
		color: '#686F99',
		paddingTop: "10%",
		right: 128
	}
});

const buttonStyle = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 18,
		width: "80%",
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "white",
		backgroundColor: 'white',
		bottom: "-5%"
		//marginTop: "15%"
	},

	text: {
		fontSize: 18,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
	},
});