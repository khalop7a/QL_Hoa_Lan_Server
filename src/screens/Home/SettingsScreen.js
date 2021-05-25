import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity  } from 'react-native';
import { icons } from '../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { firebase } from '../../firebase/config';

const SettingsScreen = ({ navigation }) => {
    //State
    const [displayName, setDisplayName] = useState("");
    const data = [
        {
          id: 1,
          name: "Điều khoản sử dụng",
        },
        {
          id: 2,
          name: "Đổi mật khẩu",
        },
        {
          id: 3,
          name: "Thông tin ứng dụng",
        },
        {
          id: 4,
          name: "Đăng xuất",
        },
      ];

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('displayName-key');
          const res = value.split('"');
          if (value === null) value = "";
          setDisplayName(res[1]);
        } catch (error) {
          // Error retrieving data
        }
    };

    _removeData = async () => {
        try {
            await AsyncStorage.removeItem('email-key');
            await AsyncStorage.removeItem('passwork-key');
            await AsyncStorage.removeItem('displayName-key');
        } 
        catch (error) {
          // Error saving data
        }
    };    

    useEffect(() => {
        _retrieveData();
    })

    _onPress = async (item) => {
        switch(item.id){
            case 4: {
                await firebase.auth().signOut().then(() =>{
                    _removeData();
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'StartScreen' }],
                    })
                }).catch((error) =>{
                });
                break;
            }
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <Image 
                    source = {icons.user}
                    resizeMode = 'contain'
                    style = {{width: 80, height: 80, borderRadius: 20, marginTop: 10}}
                />
                <Text style={styles.textHeadingStyle}>{displayName}</Text>             
            </View>
            <View style={styles.list_custom}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return(
                            <TouchableOpacity onPress={() => this._onPress(item)}>
                                <View style={styles.items}>
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.3,
        alignItems: 'center',
    },
    list_custom: {
        flex: 0.7,
    },
    textHeadingStyle: {
        marginTop: 10,
        fontSize: 40,
        color: 'green',
        fontWeight: 'bold',
      },
    items: {
        height: 70,
        padding: 10,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#848484',
        justifyContent:'center',
    },
    itemText: {
        color: "green",
        fontSize: 20,
    },
});

export default SettingsScreen
