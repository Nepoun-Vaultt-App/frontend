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

export default function RegisterGame({ navigation }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')

    const route = useRoute()
    const userId = route.params?.id

    const data = {
        TABLE_ID: 2,
        gameName: name,
        description: description,
        icon: icon,
        averageScore: 0
    }

    const handleSubmit = async () => {
        try {
            await axios.post('http://192.168.113.241:5000/create', data)
                .then(response => {
                    Alert.alert("Jogo cadastrado!")
                    navigation.navigate('User', { id: userId })
                })
        } catch (e) {
            console.log(e.response.data)
        }
    }

    return (
        <View style={styles.container}>

            <Image source={require('../../assets/chest.png')} style={styles.chestMainIcon} />
            <Text style={styles.subtitle}>Por favor, insira os dados do jogo a ser cadastrado</Text>

            <Text style={styles.inputLabel}>Nome do jogo</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                autoCapitalize={"none"}
            />

            <Text style={styles.inputLabel}>Descrição do jogo</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                autoCapitalize={"none"}
            />

            <Text style={styles.inputLabel}>Icone do jogo (em URL)</Text>
            <TextInput
                style={styles.input}
                value={icon}
                onChangeText={setIcon}
                autoCapitalize={"none"}
            />

            <Pressable onPress={handleSubmit} style={buttonStyle.button}>
                <Text style={buttonStyle.text}>Cadastro</Text>
            </Pressable>
        </View>
    )

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
        alignSelf: 'center'
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