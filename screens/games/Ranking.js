import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    Pressable,
    useEffect,
    ScrollView
} from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useFonts } from 'expo-font';

export default function Ranking({ navigation }) {
    const [hasInitiated, setHasInitiated] = React.useState(false);
    const [games, setGames] = React.useState()
    const [username, setUsername] = React.useState('')
    const [gamesPlayed, setGamesPlayed] = React.useState('')
    const route = useRoute()
    const userId = route.params?.userId
    var num = 0
    function organizarPorAverageScore(array) {
        array.sort(function (a, b) {
            return b.value["averageScore"] - a.value["averageScore"];
        });

        return array;
    }


    function makeIterable(obj) {
        return Object.keys(obj).map((key) => ({ key, value: obj[key] }));
    }

    const handleInitiation = async () => {
        try {
            console.log(userId)
            await axios.post('http://192.168.113.241:5000/getById', { _id: userId, TABLE_ID: 1 })
                .then(response => {
                    setUsername(response.data["username"])
                    setGamesPlayed(response.data["gameList"].length)
                })


        } catch (e) {
            console.log("ERRO: " + e)
        }
    }

    const handleGames = async () => {
        try {

            await axios.post('http://192.168.113.241:5000/getAll', { TABLE_ID: 2 })
                .then(response => {
                    const iterable = makeIterable(response.data)
                    let sortedArray = []
                    sortedArray = organizarPorAverageScore(iterable)
                    setGames(sortedArray)
                })
                .catch(error => console.log(error))

        } catch (error) {

        }
    }

    React.useEffect(() => {
        handleInitiation().then(handleGames)
        setHasInitiated(false)
    }, [])

    if (hasInitiated == false) {
        setHasInitiated(true)
    }




    return (
        <View style={styles.backgroundColorMain}>
            <View style={styles.container2}>


                <Image source={require('../../assets/chest.png')} style={styles.chestMainIcon} />
                <Text style={styles.title}>Vaultt</Text>

                <Pressable onPress={() => navigation.navigate('Message')}>
                    <Image source={require('../../assets/message.png')} style={card.messageIcon} />
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Config')}>
                    <Image source={require('../../assets/config.png')} style={card.configIcon} />
                </Pressable>

            </View>
            <View style={styles.container}>

                <Image source={require('../../assets/trophy.png')} style={styles.chestMainIcon} />
                <Text style={styles.title}>Melhores jogos!</Text>


            </View>
            <View style={styles.pageDivider} />




            <ScrollView>
                <View style={{
                    width: "90%",
                    alignSelf: 'center'
                }}>
                    {games?.map(i => {
                        i.key
                        num += 1;
                        return (
                            <Pressable onPress={() => navigation.navigate('ViewGame', { gameId: i.value['_id'], icon: i.value["icon"], userId: userId, gameName: i.value['gameName'], description: i.value['description'], averageScore: i.value["averageScore"] })}>
                                <View style={gameCard.card}>
                                    <Image source={{ uri: i.value['icon'] }} style={gameCard.image} />
                                    <View>
                                        <View style={gameCard.row}><Text style={gameCard.userTitle}>{i.value['gameName']}</Text></View>
                                        <View style={gameCard.row}><Text style={gameCard.description}>{num + "°"}</Text></View>
                                    </View>
                                </View>
                            </Pressable>
                        )


                    })}
                </View>
            </ScrollView>


        </View>
    );
}


const gameCard = StyleSheet.create({
    card: {
        borderColor: "black",
        borderBottomWidth: 1,
        flexDirection: "row",
        paddingBottom: 45,
        paddingTop: 45
    },
    row: {
        flexDirection: 'row',
        display: "flex",
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

const gameGrid = StyleSheet.create({
    title: {
        fontFamily: 'norwester',
        marginLeft: "6%",
        fontSize: 12,
        color: 'white'
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


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#2B2B45',
        justifyContent: 'flex-start',
        paddingTop: 50,

    },
    container2: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#2B2B45',
        justifyContent: 'flex-start',
        paddingTop: 50,

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
        fontFamily: 'norwester',
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
    }
});



