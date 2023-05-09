import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView,Alert } from 'react-native'
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';
import api from '../requests/api.js'

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [flag,setFlag] = useState(0)
    async function Login() {
        try {
            const users = await api.getUsers();
            indexOfUse = users.findIndex(e => e.username == username)
            if(indexOfUse==-1){
                Alert.alert("Hatalı Giriş")
            }
            else{
                if(users[indexOfUse].password ==password){
                    navigation.navigate("Home",{id:users[indexOfUse]._id})
                }
                else{
                    Alert.alert("Hatalı Giriş")
                }
            }
          } catch (error) {
            console.error(error);
          }
      
      }
    return (
        <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{}}
            >
                <Image
                    style={styles.loginImage}
                    resizeMode='cover'
                    //blurRadius={3}
                    //overlayColor={'rgba(0, 0, 255, .9)'}
                    source={require('../assets/images/bg5.jpg')}
                />
                <View style={styles.overlay} />

                
            </KeyboardAvoidingView>
            <View style={styles.container}>

                <Text style={styles.welcomeText}>Giriş Yap</Text>

                <TextInput
                    mode='outlined'
                    style={{ width: '80%', borderRadius: 20,marginBottom:10 }}
                    label="Kullanıcı Adı"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    style={{ width: '80%', borderRadius: 20,marginBottom:10 }}
                    mode='outlined'
                    label="Şifre"
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <TouchableOpacity style={styles.loginBtn} onPress={()=>{Login()}}>
                    <Text style={styles.loginText}>GİRİŞ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerBtn} onPress={()=>navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Hesabın mı yok? Kayıt Ol</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    loginImage: {
        height: 400,

    },
    overlay: {
        ...StyleSheet.absoluteFillObject,

    },
    headerText: {
        position: 'absolute',
        top: 50,
        left: 260,
        fontSize: 50,
        color: '#fff',
        paddingBottom: 100
    },
    container: {
        flex: 1,
        paddingTop: 40,
        marginTop: -50,
        width: '100%',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        justifyContent: 'flex-start',
        alignItems: 'center'

    },
    welcomeText: {
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 25,
        color: '#0644a3',

    },
    inputView: {
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        width: "70%",
        height: 45,
        marginBottom: 20,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        backgroundColor: "#a0bff5",
    },
    loginText: {
        color: '#0644a3',
        fontSize: 16,

    },
    registerBtn: {
        marginTop: 10,
        marginRight: 50,
        alignSelf: 'flex-end',

    },
    registerText: {
        color: 'black',
        fontSize: 14,
        color: '#0644a3',
    }
});