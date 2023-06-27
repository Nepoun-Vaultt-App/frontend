import * as React from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    Pressable,
    TextInput,
    useEffect,
    ScrollView
} from 'react-native';
import axios from 'axios';




export default function MessageScreen({ navigation }) {
    const [hasInitiated, setHasInitiated] = React.useState(false);
    const [buscaUsuario, setBuscaUsuario] = React.useState('')
    const [friends, setFriends] = React.useState()
    const [username, setUsername] = React.useState('')
    const route = useRoute()
    const userId = route.params?.id
    /* console.log(JSON.parse()) */
    const dataa = {
        _id: userId,
        TABLE_ID: '1',
    }

    console.log(dataa)

    React.useEffect(() => {
        setHasInitiated(false)
    }, [])
    const handleInitiation = async () => {
        try {
            await axios.post('http://192.168.113.241:5000/getById', dataa)
                .then(response => {

                    setUsername(response.data["username"])
                    setFriends(response.data["friends"]);
                })
        } catch (error) {
            console.log("ERRO: " + error.response.data)
        }
    }


    if (hasInitiated == false) {
        handleInitiation()
        setHasInitiated(true)
    }

    const handleAddFriend = async () => {
        try {

            var friendData = {
                userId: userId,
                friendName: buscaUsuario,
                username: username,
                _column: 'username',
                _value: buscaUsuario
            }

            if (friends.some((friend) => friend["friendName"] === buscaUsuario)) {
                Alert.alert('Amigo já cadastrado!')
                return;
            }

            await axios.put('http://192.168.113.241:5000/addFriend', friendData)
                .then(response => { navigation.navigate('Message', { id: userId }) });

            setHasInitiated(false)
        } catch (error) {
            console.log("ERRO: " + error.response.data)
        }
    }

    return (
        <View style={styles.backgroundColorMain}>

            <View style={styles.container}>
                <Pressable onPress={() => navigation.navigate('User')}>
                    <Image source={require('../../assets/chest.png')} style={styles.chestMainIcon} />
                </Pressable>
                <Text style={styles.title}>Vaultt</Text>

            </View>

            <View style={card.card}>

                <Image source={require('../../assets/user_placeholder.jpg')} style={card.icon} />
                <View style={card.usernameTitle}>
                    <Text style={card.username}>{username}</Text>
                </View>
            </View>
            <View style={styles.pageDivider} />

            <View style={messages.ccontain}>
                <Text style={styles.inputLabel}>Adicione um amigo!</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setBuscaUsuario(text)}
                    autoCapitalize={"none"}
                />
                <Pressable onPress={handleAddFriend} style={buttonStyle.button}>
                    <Text style={buttonStyle.text}>Adicionar</Text>
                </Pressable>
            </View>

            <View style={styles.pageDivider} />

            <View style={messages.container}>
                <View style={messages.messageListTitleContainer}>
                    <Text style={messages.messageListTitle}>Mensagens</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    {friends?.map(i => {
                        return (
                            <>
                                <Pressable onPress={() => {
                                    navigation.navigate('Chat', { directId: i['directId'] })
                                }}>
                                    <View style={messages.messageCard}>
                                        <Image source={require('../../assets/user_placeholder.jpg')} style={messages.icon} />
                                        <View style={messages.test}>
                                            <View>
                                                <Text style={messages.userTitle}>{i.key}:{i["friendName"]}</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={styles.pageDivider} />
                                </Pressable>
                            </>
                        )

                    })}
                </View>


            </View>
        </View>
    )

}

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

const messages = StyleSheet.create({
    container: {
        backgroundColor: '#2B2B45',
        justifyContent: 'flex-start',
        width: "90%",
        alignSelf: 'center'
    },
    ccontain: {
        backgroundColor: '#2B2B45',
        alignItems: 'center',
    },
    messageListTitle: {
        fontSize: 21,
        color: "#7F8DA1",
    },
    messageListTitleContainer: {
        flexDirection: 'row',
        display: 'flex'
    },
    messageCard: {
        flexDirection: 'row',
        height: 50
    },
    icon: {
        resizeMode: "contain",
        width: 45,
        height: 45,
        marginRight: 10,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
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
});

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
        width: "130%",
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
        borderBottomColor: '#8492A6',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: "95%",
        alignSelf: "center",
        paddingTop: 25,
        marginBottom: 15
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
        right: 0
    }
});

