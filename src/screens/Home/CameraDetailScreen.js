import React, {useState, useEffect, useRef} from 'react'
import { 
    View, Text, SafeAreaView, 
    StyleSheet, ImageBackground, 
    ActivityIndicator, 
    Dimensions,
    FlatList,
    Image, 
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {BackButton} from '../../components';
import axios from 'axios';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const CameraDetailScreen = ({route, navigation}) => {

    const { uri } = route.params;
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(true);
    const [imagesData, setImagesData] = useState([]);
    const _isMounted = useRef(true);

    onPress = (item) => {
        if(item){
            navigation.navigate('DetailScreen', item);
        }
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              width: 30,
              height: 10,
            }}
          />
        );
    };
//------------AI----------------//
    useEffect(async () => {
        let ok = false;
        let result = [];
        let kq = [];
        let data = [];
        //Get dữ liệu
        const datum = new FormData();
        datum.append('name', 'avatar');
        datum.append('fileData', {
            uri : uri,
            type: "image/jpeg", //Chỉ cho phép upload ảnh JPG
            name: uri.substring(uri.lastIndexOf("/") + 1, uri.length)
        });
        //Gửi dữ liệu đi
        const config = {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            },
            body: datum,
        };
        //POST hình lên Server 
        await fetch("http://192.168.1.16:8080/api/" + "upload", config)
        .then((response) => {

        })
        .catch((error) => {
            console.error(error);
        });
        //Chờ kết quả phản hồi và nhận dữ liệu trả về từ Server
        const res = await axios.get('http://192.168.1.16:8080/api/download');
        //Test kết quả
        console.log(res.data)  
        //-----------TIỀN XỬ LÝ DỮ LIỆU-----------------
        res.data.forEach(element => {
            //Tách từng chữ
            kq.push(element.split(" "));
        })
        //Tách mảng thì các chuỗi keyword
        data = [].concat.apply([], kq);
        //Xóa trắng thừa
        data = data.filter(function(str) {
            return /\S/.test(str);
        });
        console.log(data);
        await fetch('https://orchidapp.herokuapp.com/api/orchids')
        .then((response) => response.json())
        .then((responseJson) => {
            setLoading(false);          
            data.forEach(element => {
                for(let j = 0; j < responseJson.length; j++)          
                if(responseJson[j].science_name.toUpperCase().indexOf(element.toUpperCase()) !== -1){
                    ok = true;
                    result.push(responseJson[j]);
                }
            });
            if (ok) setFlag(false);
            setImagesData(result);
        })
        .catch((error) => {
            console.error(error);
        });
      
        return () => { _isMounted.current = false; };
    }, [])

    
    return (  
        <SafeAreaView style={styles.container}>
            <BackButton goBack={navigation.goBack} />
            <ImageBackground
                source = {{uri: uri}}
                resizeMode = 'cover'
                style = {{width: "100%", height: 250}}
                imageStyle={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40}}
            >                  
            </ImageBackground>              
                <View style={styles.viewGallery}>
                    <Text style={{fontSize: 30, fontWeight: "bold", margin: 5, color: 'green'}}>Hình ảnh</Text>
                    {
                        (loading) ?
                        (
                            <View>
                            <ActivityIndicator size="large" color="#00ff00" style={{position: 'absolute', top: 200, left: 160}}/>
                            <Text>Recognition in progress....</Text>
                            </View>
                        ):
                        (
                            (flag) ?
                            (
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', color: 'green'}}>No result</Text>
                                </View>
                            ) : 
                            (
                                <FlatList
                                    horizontal={true}
                                    data={imagesData}
                                    extraData={this.state}
                                    keyExtractor={(item, index) => {
                                        return  index.toString();
                                    }}
                                    renderItem={({item}) => {
                                        return <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                            <Image source={{uri: item.url_m[0]}} style={{height: windowHeight - 400, width: 250, borderRadius: 10}}/>
                                            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>{item.science_name}</Text>
                                            <TouchableOpacity
                                                style={{
                                                    height: 50,
                                                    width: 200,
                                                    backgroundColor: 'green',
                                                    borderRadius: 30,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                                onPress={() => onPress(item)}
                                            >
                                                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Chi tiết</Text>
                                            </TouchableOpacity>
                                        </View>;
                                    }}
                                    ItemSeparatorComponent = {this.renderSeparator}
                                />
                            )
                            
                        )
                    }
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewGallery: {
        top: -30,
        left: windowWidth*0.1/2 ,
        height: windowHeight - 250,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20
    },
});

export default CameraDetailScreen
