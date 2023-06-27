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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState } from 'react';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");


	const handleLogin = async () => {
		try{
			const response = await axios.post('http://192.168.113.241:5000/login', {
				username : username,
				password : password,
			});

			switch(response.data){
				case "wrong password":
					Alert.alert(
						"Falha no login",
						"Senha errada!"
					)
					break;
				case "user not found":
					Alert.alert(
						"Falha no login",
						"Usuario não encontrado"
					)
					break;
				default:
					navigation.navigate('User', { id: response.data})
					break;
			}

		}catch(error){
			console.error(error);
		}
	};





return (
	<View style={styles.container}>
		<Image source={require('../../assets/chest.png')} style={styles.chestMainIcon} />
		<Text style={styles.title}>Bem vindo de volta!</Text>
		<Text style={styles.subtitle}>Por favor, coloque seus dados para se entrar</Text>

		<Text style={styles.inputLabel}>Usuario</Text>
		<TextInput
			style={styles.input}
			onChangeText={(text) => setUsername(text)}
			autoCapitalize={"none"}
		/>
		<Text style={styles.inputLabel}>Senha</Text>
		<TextInput
			style={styles.input}
			secureTextEntry
			onChangeText={(text) => setPassword(text)}
		/>

		<Pressable onPress={handleLogin} style={buttonStyle.button}>
			<Text style={buttonStyle.text}>Entrar</Text>
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
		bottom: "-20%"

	},
	text: {
		fontSize: 18,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
	},
});