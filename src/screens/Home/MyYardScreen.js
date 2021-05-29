import React, {useEffect, useState, useRef} from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, Animated, Alert, ActivityIndicator, FlatList } from 'react-native'
import axios from 'axios';
import { images } from '../../constants';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import AsyncStorage from '@react-native-community/async-storage';

const MyYardScreen = ({navigation}) => {
    
    const [favourite, setFavourite] = useState([]);
    const [favourite_id, setFavourite_id] = useState([]);
    const [loading, setLoading] = useState(true);
    let uid = "";
    const onPress = () => {
        navigation.navigate("Feed");
    }
   
    useEffect(() => {  
        const unsubscribe = navigation.addListener('focus', async () => {
            let datum = [];
            let result = [];
            try {
                const value = await AsyncStorage.getItem('uid-key');
                const res = value.split('"');
                uid = res[1];
            } catch (error) {
                console.log(error)
            }
            await axios.get('https://orchid-server.herokuapp.com/api/user/' + uid)
            .then(response => {
                datum = response.data.favourite;
                setFavourite_id(datum);
            })
            .catch(error => console.log(error));
            
            await axios.get('https://orchid-server.herokuapp.com/api/orchids')
            .then(response => {
                for(i = 0; i < response.data.length; i++){
                    for(var j = 0; j < datum.length; j++ ){
                        if( response.data[i].orchid_id == datum[j]){
                            result.push(response.data[i]);
                        }
                    }
                }
            })
            .catch(error => console.log(error));
            setFavourite(result);
            setLoading(false)
        });
        return unsubscribe;
    }, [navigation])

    useEffect(async () => {
        try {
            const value = await AsyncStorage.getItem('uid-key');
            const res = value.split('"');
            uid = res[1];
        } catch (error) {
            console.log(error)
        }
        await axios.put('https://orchid-server.herokuapp.com/api/user/update/' + uid, {
            "favourite": favourite_id
        });
     }, [favourite_id]);

    return (
        <SafeAreaView style={{flex: 1, marginBottom: 139}}>
        {
            (loading) ? 
            (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <ActivityIndicator size="large" color="#00ff00" /> 
            </View>):
            (
                (favourite.length === 0) ?
            (
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Image 
                        source={images.flower}
                        resizeMode = "contain"
                        style = {{height: 170, width: 150}}
                    />
                    <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 20, color:"#0B3B0B"}}>Chưa có dữ liệu</Text>
                    <Text style={{color:'#40FF00', fontSize: 15, marginTop: 10}}>Thêm một bông hoa đầu tiên và tìm hiểu chúng</Text>
                    <TouchableOpacity
                        onPress = {onPress}
                        style={styles.btnStyle}
                    >
                        <Text style={{color: 'white', fontSize: 20}}>Bắt đầu thêm</Text>
                    </TouchableOpacity>
                </View>
            ):
            (
                <View>
                    <Text style={{fontSize:30, color: '#0B610B', margin: 10, fontWeight: "900"}}>Yêu thích</Text>
                    <FlatList 
                        keyExtractor={(item, index) => {
                            return  index.toString();
                        }}
                        data={favourite}
                        renderItem={({ item, index }) =>
                        <Swipeable 
                            key= {index}
                            renderRightActions={(progress, dragX) => {
                            const scale = dragX.interpolate({
                            inputRange: [-100, 0],
                            outputRange: [0.7, 0]
                        })
                        return (
                            <>
                                <TouchableOpacity onPress={ () => {
                                    Alert.alert(
                                        'Thông báo',
                                        'Bạn có chắc muốn xóa ?',
                                        [
                                            {text: 'Không', onPress: () => {}, style: 'cancel' },
                                            {text: 'Có', onPress: async () => {                    
                                                setFavourite(prevItemState => prevItemState.filter((_item, _Index) => _Index != index));
                                                setFavourite_id(prevItemState => prevItemState.filter((_item, _Index) => _Index != index))                                            
                                                
                                            }}
                                        ],
                                        { cancelable: true}
                                    );
                                }}>
                                    <View
                                        style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}>
                                        <Animated.Text
                                        style={{
                                            color: 'white',
                                            paddingHorizontal: 10,
                                            fontWeight: '600',
                                            transform: [{ scale }]
                                        }}>
                                        Xóa
                                        </Animated.Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("DetailScreen", item);
                                }}>
                                    <View
                                        style={{
                                        flex: 1,
                                        backgroundColor: 'green',
                                        justifyContent: 'center'
                                        }}>
                                        <Animated.Text
                                        style={{
                                            color: 'white',
                                            paddingHorizontal: 10,
                                            fontWeight: '600',
                                            transform: [{ scale }]
                                        }}>
                                        Chi tiết
                                        </Animated.Text>
                                    </View>
                                </TouchableOpacity>
                            </>
                        )
                        }}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        backgroundColor: index % 2 == 0 ? 'mediumseagreen' : 'tomato'
                                    }}>
                                    <Image 
                                        source = {{uri: item.url_m[0] }}
                                        style = {{width: 100, height: 100, margin: 5}}
                                    />
                                    <View style={{flex: 1, flexDirection: 'column'}}>
                                        <Text style={[styles.flatlistItem, {fontSize: 20, fontWeight: 'bold'}]}>{item.science_name}</Text>
                                        <Text style={styles.flatlistItem}>{item.name}</Text>
                                    </View>
                                </View>
                                <View 
                                    style={{
                                        height: 1,
                                        backgroundColor: 'white'
                                    }}>
                                </View>
                            </View>
                        </Swipeable>
                        }
                        initialNumToRender = {0}
                        maxToRenderPerBatch = {5}
                        removeClippedSubviews = {true}
                        scrollEventThrottle = {16}
                    />
                </View>
            )
            )
        }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        marginTop: 30,
        height: 50,
        width: 200,
        backgroundColor: '#298A08',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    flatlistItem: {
        color: 'white',
        padding: 10,
        fontSize: 16
    }
});

export default MyYardScreen
