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
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
export default function ConfigScreen({ navigation }) {

    var hasInitiated = false
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

            const response = await axios.post('http://192.168.113.241:5000/getById', data);

            setUsername(response.data["username"])
        } catch (error) {
            console.log("ERRO: " + error.response.data)
        }
    }



if (hasInitiated == false) {
    handleInitiation()
    hasInitiated = true
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
        <View style={buttonStyle.container} >
            <Pressable onPress={() => navigation.navigate('UpdateProfile', {id: userId})} style={buttonStyle.button}>
                <Text style={buttonStyle.text}>Editar a conta</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Home')} style={buttonStyle.button}>
                <Text style={buttonStyle.text}>Sair da conta</Text>
            </Pressable>
            <Pressable onPress={async () => {
                try {
                    await axios.delete('http://192.168.113.241:5000/delete', { data: { TABLE_ID: "1", _id: userId } })
                    .then(navigation.navigate('Home'))
                } catch (error) {
                    console.log("ERRO: " + error)
                }
            }} style={buttonStyle.button}>
                <Text style={buttonStyle.text}>Deletar conta</Text>
            </Pressable>
        </View>


    </View>
)
}

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
    usernameTitle: {
        width: "50%"
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
    }
});

const buttonStyle = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",
        paddingVertical: 18,
        marginLeft: "10%",
        marginTop: "5%",
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
    container: {
        flexDirection: 'row',
        display: "flex",
        alignSelf: "center",
        flexWrap: 'wrap',
        width: "90%",
    }
});