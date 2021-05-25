import React, { useState } from 'react';
import { theme } from '../../core/theme';
import { Text } from 'react-native-paper'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
import { nameValidator } from '../../helpers/nameValidator';
import { confirmPasswordValidator } from '../../helpers/confirmPasswordValidator';
import {
    Background,
    Header,
    Logo,
    Button,
    BackButton,
    TextInput
} from '../../components';
import { firebase } from '../../firebase/config';
import AsyncStorage from '@react-native-community/async-storage';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState({value: '', error: ''});
    const [email, setEmail] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});
    const [confirmPassword, setConfirmPassword] = useState({value: '', error: ''})

    _storeData = async (displayName) => {
        try {
            await AsyncStorage.setItem('email-key', JSON.stringify(email.value));
            await AsyncStorage.setItem('passwork-key', JSON.stringify(password.value));
            await AsyncStorage.setItem('displayName-key', JSON.stringify(displayName));
        } 
        catch (error) {
          // Error saving data
        }
    };    

    const onSignUpPressed = async () => {
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        const confirmPasswordError = confirmPasswordValidator(confirmPassword.value, password.value);
        if (emailError || passwordError || nameError || confirmPasswordError){
            setName({ ...name, error: nameError });
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setConfirmPassword({...confirmPassword, error: confirmPasswordError});
            return;
        }
        await firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then((response) => {
                    response.user.updateProfile({
                        displayName: name.value
                    });
                    const uid = response.user.uid
                    const data = {
                        uid,
                        email: email.value,
                        displayName: name.value,
                    };
                    const usersRef = firebase.firestore().collection('users')
                    usersRef
                        .doc(uid)
                        .set(data)
                        .then(() => {
                            _storeData(name.value);
                            navigation.reset({
                                index: 0,
                                routes: [{name: 'HomeStackScreen'}]
                            })
                        })
                        .catch((error) => {
                            alert(error)
                        });
                })
                .catch((error) => {
                    alert(error)
            });
    }

    return (
        <ScrollView>
            <Background>
                <BackButton goBack={navigation.goBack} />
                <Logo />
                <Header>Create Account</Header>
                <TextInput
                    label="Name"
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: '' })}
                    error={!!name.error}
                    errorText={name.error}
                />
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, error: '' })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <TextInput
                    label="Password"
                    returnKeyType="next"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />
                <TextInput
                    label="Confirm Password"
                    returnKeyType="done"
                    value={confirmPassword.value}
                    onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
                    error={!!confirmPassword.error}
                    errorText={confirmPassword.error}
                    secureTextEntry
                />
                <Button
                    mode="contained"
                    onPress={onSignUpPressed}
                    style={{ marginTop: 24 }}
                >
                    Sign Up
                </Button>
                <View style={styles.row}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                    <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        </ScrollView>    
    )
}

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
})

export default RegisterScreen
