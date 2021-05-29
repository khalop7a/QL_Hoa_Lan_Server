import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, FeedScreen, MyYardScreen, SettingsScreen, CameraScreen } from '../screens/Home';
import { icons } from '../constants';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            top: -20,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress = {onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#e32f45' 
        }}>
            {children}
        </View>
    </TouchableOpacity>
)

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 70,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source = {icons.home} 
                            resizeMode = 'contain'
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Trang chủ</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name="Feed" component={FeedScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source = {icons.feed} 
                            resizeMode = 'contain'
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Thư viện</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name="Camera" component={CameraScreen} options={{
                tabBarIcon: ({focused}) => (                   
                    <Image 
                        source = {icons.camera} 
                        resizeMode = 'contain'
                        style = {{
                            width: 30,
                            height: 30,
                            tintColor: '#fff'
                        }}
                    />                 
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props} />
                )
            }}/>           
            <Tab.Screen 
                name="MyYard" 
                component={MyYardScreen}               
                options= {{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source = {icons.favorite} 
                            resizeMode = 'contain'
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Yêu thích</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name="Settings" component={SettingsScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image 
                            source = {icons.settings} 
                            resizeMode = 'contain'
                            style = {{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>Cài đặt</Text>
                    </View>
                ),
            }}/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
});

export default Tabs;