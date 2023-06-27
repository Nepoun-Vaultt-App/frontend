import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Alert,
	Pressable
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GoogleSignInButton from '../components/GoogleSignInButton';
import { useFonts } from 'expo-font';


export default function HomeScreen({ navigation }) {

	const [loaded] = useFonts({
		norwester: require('../assets/fonts/norwester.otf')
	})
	if(!loaded){
		return null;
	}

	return (
		<View style={styles.container}>
			<Image source={require('../assets/chest.png')} style={styles.chestMainIcon} />
			<Text style={styles.title}>Vaultt</Text>

			<GoogleSignInButton title="Entrar" onPress={() => navigation.navigate('Login')} />
			<Pressable onPress={() => navigation.navigate('Register')} style={buttonStyle.button}>
				<Text style={buttonStyle.text}>Registro</Text>
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
		width: 200,
		height: 200,
		marginTop: 120,
	},
	title: {
		fontFamily: 'norwester',
		marginTop: -50,
		fontSize: 62,
		color: 'white'
	},
	signInButton: {
		marginTop: 1
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
		marginTop: 20
	},
	text: {
		fontSize: 18,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
	},
});