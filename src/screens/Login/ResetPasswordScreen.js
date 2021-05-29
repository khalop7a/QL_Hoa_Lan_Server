import React, { useState } from 'react'
import { emailValidator } from '../../helpers/emailValidator'
import {
    BackButton,
    Background,
    Logo,
    Header,
    TextInput,
    Button
} from '../../components';
import { firebase } from '../../firebase/config';

const ResetPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState({ value: '', error: '' });

    const sendResetPasswordEmail = async () => {
        const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({...email, error: emailError});
            return;
        }
        await firebase
                .auth()
                .sendPasswordResetEmail(email.value)
                .then(function(){

                })
                .catch(function(error) {
                    console.log(error);
                    });
        navigation.navigate('LoginScreen');
    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Khôi phục mật khẩu</Header>
            <TextInput 
                label="Địa chỉ Email"
                returnKeyType="done"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                description="Bạn sẽ nhận được email với link reset mật khẩu."
            />
            <Button
                mode="contained"
                onPress={sendResetPasswordEmail}
                style={{ marginTop: 16 }}
            >
                Gửi
            </Button>
        </Background>
    )
}

export default ResetPasswordScreen
