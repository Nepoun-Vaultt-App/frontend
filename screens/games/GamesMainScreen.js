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

export default function GamesMainScreen({ navigation }) {
    return (
        <View style={styles.backgroundColorMain}>
            <View style={styles.container}>
                <Image source={require('../../assets/chest.png')} style={styles.chestMainIcon} />
                <Text style={styles.title}>Vaultt</Text>


            </View>

            <View style={styles.pageDivider} />

            <View style={gameGrid.row}>
            
            <View style={buttonStyle.container} >
                <Pressable style={buttonStyle.button} onPress={() => navigation.navigate('Ranking', {userId: userId})}>
                    <Text style={buttonStyle.text}>Ranking de jogos</Text>
                </Pressable>
                <Pressable style={buttonStyle.button} onPress={() => navigation.navigate('GameMenu', {userId: userId})}>
                    <Text style={buttonStyle.text}>Gerenciar jogos</Text>
                </Pressable>
            </View>

            </View>

            <View style={styles.pageDivider} />
            <Text style={gameGrid.title}>Populares recentemente:</Text>
            <View style={gameGrid.row}>
                <Image source={require('../../assets/placeholder.png')} style={gameGrid.image} />
                <Image source={require('../../assets/placeholder.png')} style={gameGrid.image} />
                <Image source={require('../../assets/placeholder.png')} style={gameGrid.image} />
            </View>
            <View style={gameGrid.row}>
                <Image source={require('../../assets/placeholder.png')} style={gameGrid.image} />
                <Image source={require('../../assets/placeholder.png')} style={gameGrid.image} />
                <Image source={require('../../assets/placeholder.png')} style={gameGrid.image} />
            </View>




        </View>
    );
}

const gameGrid = StyleSheet.create({
    title: {
        fontFamily: '',
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