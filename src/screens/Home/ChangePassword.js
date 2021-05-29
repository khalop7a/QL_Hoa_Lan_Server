import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Keyboard } from 'react-native'
import { BackButton, Logo, Header, TextInput, Background } from '../../components';
import { passwordValidator } from '../../helpers/passwordValidator';
import AsyncStorage from '@react-native-community/async-storage';

const ChangePassword = ({navigation}) => {

    const [password, setPassword] = useState({ value: '', error: '' });
    const [result, setResult] = useState("");
    const [confirmPassword, setConfirmPassword] = useState({value: '', error: ''})
    const [newPassword, setNewPassword] = useState({ value: '', error: '' });
    const [isEnable, setIsEnable] = useState(true);


    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('passwork-key');
          const res = value.split('"');
          if (value === null) value = "";
          setResult(res[1]);
        } catch (error) {
        }
    };

    useEffect(() => {
        _retrieveData();
    })

    const onCheckPressed = async () => {
        let passwordError = passwordValidator(password.value);
        Keyboard.dismiss();
        if (passwordError) {           
            setPassword({ ...password, error: passwordError });
            return;
        }
        if(password.value == result){
            setIsEnable(false);
        }
        else{
            passwordError = "Mật khẩu chưa đúng"
            setPassword({ ...password, error: passwordError });
            return;
        }
    }

    return (
        <Background>
                <BackButton goBack={navigation.goBack}/>
                <Logo />
                <Header>Đổi mật khẩu</Header>
                <TextInput
                    label="Mật khẩu cũ"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                    disabled = {!isEnable}
                />
                <TouchableOpacity
                    style={{
                        height: 50,
                        width: 200,
                        backgroundColor: '#01DF01',
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={onCheckPressed}
                    disabled = {!isEnable}
                    
                >
                    <Text>Kiểm tra</Text>
                </TouchableOpacity>
                <TextInput
                    label="Mật khẩu mới"
                    returnKeyType="next"
                    value={newPassword.value}
                    disabled = {isEnable}
                    onChangeText={(text) => setNewPassword({ value: text, error: '' })}
                    error={!!newPassword.error}
                    errorText={newPassword.error}
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
                    disabled = {isEnable}
                />
                <TouchableOpacity
                    style={{
                        height: 50,
                        width: 200,
                        backgroundColor: '#01DF01',
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'StartScreen' }],
                    })}
                    disabled = {isEnable}
                    
                >
                    <Text>Đăng nhập lại</Text>
                </TouchableOpacity>
            
        </Background>
    )
}

export default ChangePassword
