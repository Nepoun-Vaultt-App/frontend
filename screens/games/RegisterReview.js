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

export default function RegisterReview({ navigation }) {

    const [reviewTitle, setReviewTitle] = useState('');
    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')
    const route = useRoute()
    const userId = route.params?.userId
    const gameId = route.params?.gameId
    const data = {
        TABLE_ID: 4,
        reviewTitle: reviewTitle,
        review: review,
        rating: rating,
        gameId: gameId
    }
    function makeIterable(obj) {
        return Object.keys(obj).map((key) => ({ key, value: obj[key] }));
    }
    const handleSubmit = async () => {
        try {

            let media = 0
            await axios.post('http://192.168.113.241:5000/getAllByColumn', { "TABLE_ID": "4", "_column": "gameId", "_value": gameId })
                .then(response => {
                    const iterable = makeIterable(response.data)


                    let somaAcumulada = 0;
                    let amountToSum = 0;
                    for (let index = 0; index < iterable.length; index++) {
                        amountToSum += 1;
                        somaAcumulada += parseInt(iterable[index].value['rating'])
                        console.log(somaAcumulada)
                    }
                    media += parseInt(rating)

                    media = somaAcumulada / amountToSum
                })
                .catch(error => console.log("ERRO2 " + error))



            await axios.post('http://192.168.113.241:5000/create', data)
                .then(response => {
                    Alert.alert("Cadastro feito")
                    
                })
                .catch(error => console.log("ERRO1 " + error))

                await axios.put('http://192.168.113.241:5000/update', {
                    "_id": gameId,
                    "TABLE_ID": 2,
                    "averageScore": media
                }).then(response => {
                    navigation.navigate('GameMenu', {id: userId})
                })
                .catch(error => error)
    
            //count reviews

            console.log(media)
        } catch (e) {
            console.log(e.response.data)
        }
    }

    return (
        <View style={styles.container}>

            <Image source={require('../../assets/chest.png')} style={styles.chestMainIcon} />
            <Text style={styles.subtitle}>Por favor, insira os dados do jogo a ser cadastrado</Text>

            <Text style={styles.inputLabel}>Titulo da review</Text>
            <TextInput
                style={styles.input}
                value={reviewTitle}
                onChangeText={setReviewTitle}
                autoCapitalize={"none"}
            />

            <Text style={styles.inputLabel}>Review</Text>
            <TextInput
                style={styles.input}
                value={review}
                onChangeText={setReview}
                autoCapitalize={"none"}
            />

            <Text style={styles.inputLabel}>Nota (0 a 5)</Text>
            <TextInput
                style={styles.input}
                value={rating}
                onChangeText={setRating}
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