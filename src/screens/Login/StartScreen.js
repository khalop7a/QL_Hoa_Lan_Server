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
            <Header>Login Template</Header>
            <Paragraph>
                The easiest way to start with your amazing application.
            </Paragraph>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('LoginScreen')}
                //onPress={ test }
            >
                Login
            </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('RegisterScreen')}
            >
                Sign Up
            </Button>
        </Background>
    )
}

export default StartScreen
