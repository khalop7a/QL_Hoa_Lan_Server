import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/core/theme'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {LogBox} from 'react-native';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
} from './src/screens/Login';
import { HomeStackScreen, NewsScreen, DetailScreen, ChangePassword, CameraDetailScreen } from './src/screens/Home';

const Stack = createStackNavigator()

const App = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName = "StartScreen"
          screenOptions = {{
            headerShown: false
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="HomeStackScreen" component={HomeStackScreen} />
          <Stack.Screen name="NewsScreen" component={NewsScreen} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="CameraDetailScreen" component={CameraDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App
