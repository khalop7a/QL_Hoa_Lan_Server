import React, { useState } from 'react';
import { theme } from '../../core/theme';
import { Text } from 'react-native-paper'
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Keyboard, ScrollView, Alert } from 'react-native'
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
    const [loading, setLoading] = useState(false);

    _storeData = async (displayName, uid) => {
        try {
            await AsyncStorage.setItem('uid-key', JSON.stringify(uid));
            await AsyncStorage.setItem('email-key', JSON.stringify(email.value));
            await AsyncStorage.setItem('passwork-key', JSON.stringify(password.value));
            await AsyncStorage.setItem('displayName-key', JSON.stringify(displayName));
        } 
        catch (error) {
          // Error saving data
        }
    };    

    const onSignUpPressed = async () => {
        Keyboard.dismiss();
        setLoading(true);
        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        const confirmPasswordError = confirmPasswordValidator(confirmPassword.value, password.value);
        if (emailError || passwordError || nameError || confirmPasswordError){
            setName({ ...name, error: nameError });
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setConfirmPassword({...confirmPassword, error: confirmPasswordError});
            setLoading(false);
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
                        favourite: [],
                    };
                    _storeData(name.value, uid);
                    const usersRef = firebase.firestore().collection('users')  
                    usersRef.doc(uid).get()
                    .then(documentSnapshot => {
                        if (!documentSnapshot.exists) {
                            usersRef
                            .doc(uid)
                            .set(data)
                            .then(async () => {      
                                navigation.reset({
                                    index: 0,
                                    routes: [{name: 'HomeStackScreen'}]
                                })                                                      
                            })
                            .catch((error) => {
                                setLoading(false);
                                Alert.alert("Thông báo", error,
                                    [
                                        {text: 'OK', onPress: () => {}, style: 'cancel' },
                                    ],
                                    { cancelable: true}
                                )
                            });
                        }
                    });

                })
                .catch((error) => {
                    setLoading(false);
                    Alert.alert("Thông báo", "Địa chỉ email này đã được đăng ký bởi tài khoản khác!",
                        [
                            {text: 'OK', onPress: () => {}, style: 'cancel' },
                        ],
                        { cancelable: true}
                    )
            });
    }

    return (    
        <ScrollView>
            <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Tạo tài khoản</Header>
            <TextInput
                label="Tên hiển thị"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />
            <TextInput
                label="Địa chỉ Email"
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
                label="Mật khẩu"
                returnKeyType="next"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <TextInput
                label="Xác nhận mật khẩu"
                returnKeyType="done"
                value={confirmPassword.value}
                onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
                error={!!confirmPassword.error}
                errorText={confirmPassword.error}
                secureTextEntry
            />
            {
                (!loading) ? 
                (
                    <Button
                        mode="contained"
                        onPress={onSignUpPressed}
                        style={{ marginTop: 24 }}
                    >
                        Đăng ký
                    </Button>
                ) :
                (
                    <ActivityIndicator size="large" color="#00ff00" />
                )
            }
            <View style={styles.row}>
                <Text>Bạn đã có tài khoản? </Text>
                <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                <Text style={styles.link}>Đăng nhập</Text>
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
