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


export default function UserMainScreen({ navigation }) {
    const [hasInitiated, setHasInitiated] = React.useState(false);
    const [gamesPlayed, setGamesPlayed] = React.useState('')
    const [username, setUsername] = React.useState('')
    const route = useRoute()
    const userId = route.params?.id
    /* console.log(JSON.parse()) */
    const data = {
        _id: userId,
        TABLE_ID: '1',
    }
    const handleInitiation = async () => {
        try {

            const response = await axios.post('http://192.168.113.241:5000/getById', data)
            .then(response => {
                setUsername(response.data["username"])
                setGamesPlayed(response.data["gameList"].length)
            })

        } catch (error) {
            console.log("ERRO: " + error.response.data)
        }
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
            <View style={card.card}>

                <Image source={require('../../assets/user_placeholder.jpg')} style={card.icon} />
                <View style={card.usernameTitle}>
                    <Text style={card.username}>{username}</Text>


                    <View style={card.columnItem}>
                        <View style={card.columnItemItem}>
                            <Text style={card.subitem}>Jogos jogados</Text>
                            <Text style={card.subitemQuantity}>{gamesPlayed}</Text>
                        </View>

                    </View>

                </View>
            </View>

            <View style={styles.pageDivider} />
            <Text style={gameGrid.title}>Gerenciamento de jogos:</Text>
            <View style={styles.ccontain}>
                <Pressable style={buttonStyle.button} onPress={() => navigation.navigate('RegisterGame')}>
                    <Text style={buttonStyle.text}>Cadastrar jogo novo</Text>
                </Pressable>
                <Pressable style={buttonStyle.button} onPress={() => navigation.navigate('Ranking', {userId: userId})}>
                    <Text style={buttonStyle.text}>Ver Ranking de jogos</Text>
                </Pressable>
                <Pressable style={buttonStyle.button} onPress={() => navigation.navigate('GameMenu', {userId: userId})}>
                    <Text style={buttonStyle.text}>Ver todos os jogos</Text>
                </Pressable>
            </View>


        </View>
    );

}

const reviewStyle = StyleSheet.create({
    reviewCard: {
        borderColor: "black",
        borderBottomWidth: 1,
        flexDirection: "row",
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
        paddingTop:"5%",
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
        marginTop:"5%",
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


