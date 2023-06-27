import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    Pressable,
    useEffect,
    ScrollView,
} from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GoogleSignInButton from '../../components/GoogleSignInButton';
import { TouchableOpacity } from 'react-native-web';
import { useFonts } from 'expo-font';
import axios from 'axios';



export default function ViewGame({ navigation }) {
    const [hasInitiated, setHasInitiated] = React.useState(false);
    //const [game, setGame] = React.useState('')
    const [reviews, setReviews] = React.useState([])
    const route = useRoute()
    const userId = route.params?.userId
    const gameId = route.params?.gameId;
    /* console.log(JSON.parse()) */
    const data = {
        _id: userId,
        TABLE_ID: '1',
    }
    const game = {
        icon: route.params?.icon,
        gameName: route.params?.gameName,
        description: route.params?.description,
        averageScore: route.params?.averageScore
    }
    console.log(reviews)
    function makeIterable(obj) {
        return Object.keys(obj).map((key) => ({ key, value: obj[key] }));
    }
    const handleInitiation = async () => {
        try {
            await axios.post('http://192.168.113.241:5000/getAllByColumn', { "TABLE_ID": "4", "_column": "gameId", "_value": gameId })
                .then(response => {
                    setReviews(makeIterable(response.data))

                })
                .catch(error => console.log(error))

        } catch (error) {
            console.log("Erro: " + error.response.data)
        }
    }




    function createReviewStars(numStars) {
        console.log("RESULT ESTRELAS: " + "⭐".repeat(numStars) + "☆".repeat(5 - numStars))
        return "⭐".repeat(numStars) + "☆".repeat(5 - numStars);
    }
    React.useEffect(() => {
        setHasInitiated(false)
    }, [])

    if (hasInitiated == false) {
        handleInitiation()
        setHasInitiated(true)
    }

    return (
        <View style={styles.backgroundColorMain}>

            <View style={styles.container}>
                <Image source={require('../../assets/chest.png')} style={styles.chestMainIcon} />
                <Text style={styles.title}>Vaultt</Text>

                <Pressable onPress={() => navigation.navigate('Message', { id: userId })}>
                    <Image source={require('../../assets/message.png')} style={card.messageIcon} />
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Config', { id: userId })}>
                    <Image source={require('../../assets/config.png')} style={card.configIcon} />
                </Pressable>

            </View>


            <View style={styles.pageDivider} />
            <View style={gameCard.card}>
                <Image source={{ uri: game['icon'] }} style={gameCard.image} />
                <View>
                    <View style={gameCard.row}><Text style={gameCard.userTitle}>{game['gameName']}</Text></View>
                    <View style={gameCard.row}><Text style={gameCard.description}>{game['description']}</Text></View>
                    <Text style={gameCard.stars}>{createReviewStars(Math.round(game['averageScore']))}</Text>
                </View>
            </View>
            <Pressable onPress={async () => {
                try {
                    await axios.post('http://192.168.113.241:5000/delete', { "TABLE_ID": "2", "_id": gameId })
                        .then(response => {
                            console.log(response.data)
                            navigation.navigate('User', { userId: userId })
                        })
                } catch (error) {
                    console.log("ERRO: " + error)
                }
            }} style={buttonStyle.button}>
                <Text style={buttonStyle.text}>Deletar jogo</Text>
            </Pressable>
            <Pressable style={buttonStyle.button} onPress={() => navigation.navigate('RegisterReview', { userId: userId, gameId: gameId })}>
                <Text style={buttonStyle.text}>Criar review</Text>
            </Pressable>
            <View style={styles.pageDivider} />
            <ScrollView>
                <View style={reviewStyle.container}>
                    {reviews?.map(i => {
                        i.key
                        return (
                            <View style={gameCard.card}>
                                <Image source={require('../../assets/user_placeholder.jpg')} style={gameCard.image} />
                                <View>
                                    <View style={gameCard.row}><Text style={gameCard.userTitle}>{i.value['reviewTitle']}</Text></View>
                                    <View style={gameCard.row}><Text style={gameCard.description}>{createReviewStars(Math.round(i.value['rating']))}</Text></View>
                                    <View style={gameCard.row}><Text style={gameCard.description}>{i.value['review']}</Text></View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

const gameCard = StyleSheet.create({
    card: {
        borderColor: "black",
        borderBottomWidth: 1,
        flexDirection: "row",
        paddingBottom: 55,
        paddingTop: 25
    },
    row: {
        flexDirection: 'row',
        display: "flex",
    },
    stars: {
        width: "60%",
        fontSize: 21,
        marginLeft: 10,
        bottom: -30
    },
    image: {
        resizeMode: "contain",
        width: 100,
        height: 150,
        marginRight: 5,
        marginLeft: 5,
        marginVertical: -25
    },

    userTitle: {
        paddingLeft: 0,
        fontSize: 24,
        bottom: 20,
        width: "100%",
        color: "#ffffff",
        fontFamily: 'norwester',

    },

    description: {
        fontSize: 14,
        color: "#686F99",
        top: '-5%',
        left: "10%",
        width: "60%",
        fontFamily: 'norwester',
        paddingBottom: "2.5%"

    },
})

const reviewStyle = StyleSheet.create({
    reviewCard: {
        borderColor: "black",
        borderBottomWidth: 1,
        flexDirection: "row",
    },
    container: {
        width: '100%',
    },
    image: {
        resizeMode: "contain",
        width: 100,
        marginRight: 10,
        marginLeft: 10,
        marginVertical: -25
    },
    userTitle: {
        fontSize: 16,
        width: "100%",
        color: "#686F99"
    },
    userText: {
        color: "#A3A7C2",
        fontSize: 12
    },
    stars: {
        color: "#686F99"
    }
})

const gameGrid = StyleSheet.create({
    title: {
        fontFamily: '',
        marginLeft: "6%",
        fontSize: 12,
        color: 'white'
    },
    testt: {
        paddingTop: 45,
    },
    row: {
        flexDirection: 'row',
        display: "flex",
        alignItems: "center",
        alignSelf: "center"
    },
    image: {
        resizeMode: "contain",
        width: 100,
        marginRight: 10,
        marginLeft: 10,
        marginVertical: -25
    },
    seeMore: {
        marginLeft: "6%",
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: -15
    }
})

const card = StyleSheet.create({
    card: {
        backgroundColor: '#2B2B45',
        flexDirection: 'row',
        display: "flex",
        alignSelf: "center",
        flexWrap: 'wrap',
        width: "90%",
        paddingTop: 25
    },
    icon: {
        width: 65,
        height: 65,
        marginRight: 10,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
    },
    configIcon: {
        width: 55,
        height: 55,
        marginTop: 10,
        marginLeft: 5
    },
    messageIcon: {
        width: 55,
        height: 55,
        marginTop: 10,
        marginLeft: 75
    },
    username: {
        fontSize: 24,
        color: "#686F99",
        paddingLeft: 10,
        top: -15,
        width: "90%",
    },

    columnItem: {
        flexDirection: "row",
        display: "flex",
        alignItems: 'center',
        paddingLeft: 15,
        paddingTop: -10
    },
    subitem: {
        color: "#A3A7C2",
        paddingLeft: 15,
        fontSize: 12,
    },
    subitemQuantity: {
        color: "#A3A7C2",
        fontSize: 24
    },
    columnItemItem: {
        alignItems: 'center'
    }

})


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#2B2B45',
        justifyContent: 'flex-start',
        paddingTop: 50,

    },
    ccontain: {
        paddingTop: "5%",
        backgroundColor: '#2B2B45',
        alignItems: 'center',
    },
    backgroundColorMain: {
        flex: 1,
        backgroundColor: '#2B2B45',
    },
    chestMainIcon: {
        width: 85,
        height: 85,
    },
    title: {
        fontFamily: '',
        marginTop: 16,
        fontSize: 32,
        color: 'white'
    },
    signInButton: {
        marginTop: 1
    },
    pageDivider: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: "95%",
        alignSelf: "center",
        paddingTop: 25,
        marginBottom: 15
    }
});

const buttonStyle = StyleSheet.create({
    button: {
        marginTop: "    5%",
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        width: "80%",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: 'white',
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


