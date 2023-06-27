import * as React from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';


export default function MessageChat({ navigation }) {

  const [messages, setMessages] = React.useState([]);
  const [text, setText] = React.useState('');
  const route = useRoute()

  const sendingMessage = {
    id: route.params?.userId,
    message: text
  }

  const sendMessage = () => {
    if (text.length > 0) {
      setMessages([...messages, { text, sender: 'user' }]);
      setText('');
    }
  };

  const getMessages = async () => {
    try {
      await axios.post('http://192.168.113.241:5000/getDirect', { _id: route.params?.directId})
        .then(response => {
          console.log(response.data) 
        })  
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    console.log(route.params?.directId)
    getMessages()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) =>
          item.sender === 'user' ? (
            <View style={styles.userMessageContainer}>
              <Text style={styles.userMessageText}>{item.text}</Text>
            </View>
          ) : (
            <View style={styles.otherMessageContainer}>
              <Text style={styles.otherMessageText}>{item.text}</Text>
            </View>
          )
        }
        keyExtractor={(item, index) => index.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={(value) => setText(value)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2B45',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#b2d8b2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  userMessageText: {
    color: '#686F99',
    fontSize: 16,
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#686F99',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  otherMessageText: {
    color: '#000',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#686F99',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    color: "#686F99",
    height: 40,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sendButtonText: {
    color: '#000',
    fontSize: 16,
  },
});
