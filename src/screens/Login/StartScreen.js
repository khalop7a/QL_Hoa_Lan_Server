import React from 'react';
import {LogBox } from 'react-native';
import {
    Background,
    Header,
    Logo,
    Button,
    Paragraph
} from '../../components';

const StartScreen = ({ navigation }) => {
    LogBox.ignoreLogs(['Reanimated 2']);
    return (
        <Background>
            <Logo />
            <Header>Bắt đầu đăng nhập</Header>
            <Paragraph>
                Cách dễ dàng nhất để sử dụng App của chúng tôi
            </Paragraph>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('LoginScreen')}
            >
                Đăng nhập
            </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('RegisterScreen')}
            >
                Đăng ký
            </Button>
        </Background>
    )
}

export default StartScreen
