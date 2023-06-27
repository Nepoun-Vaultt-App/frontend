import { StyleSheet } from 'react-native';

export const card = StyleSheet.create({
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
        height: 65
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
        borderWidth: 1,
        borderColor: 'black'
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
