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

import HomeScreen from './screens/HomeScreen';

import UserMainScreen from './screens/user/UserMainScreen';
import SignUpScreen from './screens/user/SignUpScreen';
import LoginScreen from './screens/user/LoginScreen';
import MessageScreen from './screens/user/MessageScreen';
import ConfigScreen from './screens/user/ConfigScreen';
import Ranking from './screens/games/Ranking';
import GameMenu from './screens/games/GameMenu';
import GamesMainScreen from './screens/games/GamesMainScreen';
import UpdateProfile from './screens/user/UpdateProfile';
import RegisterGame from './screens/games/RegisterGame';
import ViewGame from './screens/games/ViewGame';
import RegisterReview from './screens/games/RegisterReview';
import MessageChat from './screens/user/messageChat';


const Stack = createNativeStackNavigator();

export default function App(props) {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Register" component={SignUpScreen} />
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="User" component={UserMainScreen} />
				<Stack.Screen name="Message" component={MessageScreen} />
				<Stack.Screen name="Config" component={ConfigScreen} />
				<Stack.Screen name="MainGame" component={GamesMainScreen} />
				<Stack.Screen name="Ranking" component={Ranking} />
				<Stack.Screen name="GameMenu" component={GameMenu} />
				<Stack.Screen name="RegisterGame" component={RegisterGame} />
				<Stack.Screen name="RegisterReview" component={RegisterReview} />
				<Stack.Screen name="UpdateProfile" component={UpdateProfile} />
				<Stack.Screen name="ViewGame" component={ViewGame} />
				<Stack.Screen name="Chat" component={MessageChat} />
			</Stack.Navigator>
		</NavigationContainer>
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
		fontFamily: '',
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
		paddingHorizontal: 120,
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