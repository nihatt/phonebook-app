import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import api from '../requests/api';

const RegisterPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if(username=="" || password ==""){
            Alert.alert("Alanlarda Hata Var!")
        }
        else{
            try {

                const result = await api.createUser({ username: username, password: password });
    
                if (result) {
                    Alert.alert("Kayıt Başarılı , Giriş Yapın")
                    navigation.navigate("Login")
                }
                else {
                }
            } catch (error) {
                console.error(error);
            }
        }

    }

    return (


        <ScrollView contentContainerStyle={{ justifyContent: 'space-between',flex:1 }} style={{flex:1}}>
            <Image

                resizeMode='contain'
                //blurRadius={3}
                //overlayColor={'rgba(0, 0, 255, .9)'}
                source={require('../assets/images/34.jpg')}
            />
            <View style={{  marginTop: -35, borderWidth: 1, height: '60%', justifyContent: 'center', backgroundColor: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                <Text style={styles.welcomeText}>Yepyeni Üyelik</Text>
                <TextInput
                    label="Kullanıcı Adı"
                    value={username}
                    mode='outlined'
                    onChangeText={text => setUsername(text)}
                    style={styles.input}
                />
                <TextInput
                    label="Şifre"
                    value={password}
                    mode='outlined'
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity style={styles.loginBtn} onPress={() => { handleRegister() }}>
                    <Text style={styles.loginText}>Kayıt Ol</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.registerText}>Hesabın mı var? Giriş Yap</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>


    );
};

const styles = StyleSheet.create({
    container: {

        alignSelf: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    welcomeText: {
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 25,
        color: '#0644a3',

    },
    loginBtn: {
        width: "80%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
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
    },
    input: {
        width: '80%',
        alignSelf: 'center',
        marginBottom: 16,
    },
    button: {

        alignSelf: 'center',
        width: '80%',
    },
});

export default RegisterPage;