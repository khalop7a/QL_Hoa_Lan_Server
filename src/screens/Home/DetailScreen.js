import React, {useState, useCallback, useEffect} from 'react'
import {BackButton} from '../../components';
import {
    TouchableOpacity, 
    Image, 
    FlatList, 
    StyleSheet, 
    View, 
    SafeAreaView,
    ImageBackground,
    Text,
    Dimensions,
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';
import { icons } from '../../constants';
import { firebase } from '../../firebase/config';
import axios from 'axios';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const DetailScreen = ({route, navigation}) => {
    const { orchid_id, url_m, science_name, name, category, location, humidity, warm, intermediate, description } = route.params;
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);
    const [textShown, setTextShown] = useState(false);  //To show ur remaining Text
    const [lengthMore,setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }
    let favourite = [];
    const onTextLayout = useCallback(e =>{
        setLengthMore(e.nativeEvent.lines.length >=4); 
    },[]);

    useEffect(async () => {
        const data = await firebase.auth().currentUser;
        setUser(data.uid);
      }, [])

    const checkID = () => {
        let flag = false;
        favourite.forEach(element => {            
            if (new String(orchid_id).valueOf() == new String(element).valueOf())
                flag = true;
        });     
        return flag;
    }

    const onPress = async () => {    
        const res = await axios.get('https://orchid-server.herokuapp.com/api/user/' + user);   
        favourite = res.data.favourite;
        setLoading(true);
        if(checkID()){
            setLoading(false)
            Alert.alert(
                'Thông báo',
                'Loại hoa này đã thêm vào mục yêu thích',
                [
                  {text: 'OK', onPress: () => {}},
                ],
            );
        }
        else{
            favourite.push(orchid_id);
            const res = await axios.put('https://orchid-server.herokuapp.com/api/user/update/' + user, {
                "favourite": favourite
            }).then(resp => {
                setLoading(false);
            })
            Alert.alert(
                'Thông báo',
                'Thêm thành công',
                [
                  {text: 'OK', onPress: () => {
                  }},
                ],
            );
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

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <BackButton goBack={navigation.goBack} />
                <ImageBackground
                    source = {{uri: url_m[0]}}
                    resizeMode = 'cover'
                    style = {{width: "100%", height: 230}}
                    imageStyle={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40}}
                >                  
                </ImageBackground>
                <View style={styles.viewHolder}>
                    <Text style = {[styles.heading]}>{science_name}</Text>
                    <Text style = {styles.textVi}>Tên tiếng việt: </Text>
                    <Text style = {styles.keyTextVi}>{name}</Text>
                    <Text style = {styles.category}>Loại (nhóm):</Text>
                    <Text style = {styles.keyCategory}>{category}</Text>
                    <Text style = {styles.locations}>Phân bố:</Text>
                    <Text style = {[styles.keyLocations, {width: 240}]}>{location}</Text>
                    {
                        (!loading) ? 
                        (
                            <TouchableOpacity
                                style = {styles.like}
                                onPress = {onPress}
                            >
                                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Yêu thích</Text>
                            </TouchableOpacity>
                        ) :
                        (
                            <ActivityIndicator size="large" color="#00ff00" style={{position: 'absolute', top: 160, left: 150}}/>
                        )
                    }
                </View>
                <View style={styles.viewItem}>
                    <Text style={{fontSize: 30, fontWeight: "bold", margin: 5, color: 'green'}}>Đặc điểm</Text>
                    <View style ={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={{
                                padding: 10,
                                paddingBottom: 15,
                                backgroundColor: 'green',
                                borderRadius: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 10,
                                ...styles.shadow
                            }}
                        >
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'white',
                                }}
                            >
                                <Image 
                                    source = {icons.humidity}
                                    resizeMode="contain"
                                    style={{
                                        width : 30,
                                        height: 30
                                    }}
                                />
                            </View>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Độ ẩm</Text>
                            <Text style={{color: 'white'}}>{humidity}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                padding: 10,
                                paddingBottom: 15,
                                backgroundColor: 'green',
                                borderRadius: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 10,
                                ...styles.shadow
                            }}
                        >
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'white',
                                }}
                            >
                                <Image 
                                    source = {icons.warm}
                                    resizeMode="contain"
                                    style={{
                                        width : 30,
                                        height: 30
                                    }}
                                />
                            </View>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Nóng</Text>
                            <Text style={{color: 'white'}}>{warm}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                padding: 10,
                                paddingBottom: 15,
                                backgroundColor: 'green',
                                borderRadius: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 10,
                                ...styles.shadow
                            }}
                        >
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white',
                            }}
                        >
                            <Image 
                                source = {icons.cool}
                                resizeMode="contain"
                                style={{
                                    width : 30,
                                    height: 30
                                }}
                            />
                            </View>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Lạnh</Text>
                            <Text style={{color: 'white'}}>{intermediate}</Text>
                    </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={styles.viewGallery}>
                    <Text style={{fontSize: 30, fontWeight: "bold", margin: 5, color: 'green'}}>Hình ảnh</Text>
                    <FlatList
                        horizontal={true}
                        data={url_m}
                        extraData={this.state}
                        keyExtractor={(item, index) => {
                            return  index.toString();
                        }}
                        renderItem={({item}) => {
                            return <Image source={{uri: item}} style={{height: 200, width: 250, borderRadius: 10}}/>;
                        }}
                        ItemSeparatorComponent = {this.renderSeparator}
                    />
                </View>
                <View style={styles.viewDesciption}>
                    <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                        <Image 
                            source = {icons.info}
                                resizeMode="contain"
                                style={{
                                    width : 30,
                                    height: 30,
                                    marginRight: 10
                                }}
                        />
                        <Text style={{fontSize: 30, fontWeight: "bold", margin: 5, color: 'green'}}>Mô tả</Text>
                    </View>
                    <View>  
                        <Text 
                            style={[styles.contentHolder, {lineHeight: 21, textAlign: 'justify', paddingRight: 10, fontSize: 15}]}
                            numberOfLines={textShown ? undefined : 4}
                            onTextLayout = {onTextLayout}
                        >
                            {description}
                        </Text>    
                        {
                        lengthMore ? <Text
                        onPress={toggleNumberOfLines}
                        style={{ lineHeight: 21, marginTop: 10, marginBottom: 5, fontSize: 20, color: 'green' }}>{textShown ? 'Thu gọn...' : 'Đọc thêm...'}</Text>
                        :null
                        } 
                    </View>    
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewHolder: {
        top: -90,
        left: windowWidth*0.1/2 ,
        height: 200,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 30,
    },
    heading: {
        fontSize: 20,
        color: '#088A08',
        fontWeight: 'bold',
        position: 'absolute', 
        top: 10, 
        left: 20,
    },
    textVi: {
        fontSize: 15,
        color: '#088A08',
        position: 'absolute', 
        top: 50, 
        left: 20,
    },
    keyTextVi: {
        fontSize: 15,
        color: '#82FA58',
        position: 'absolute', 
        top: 50, 
        left: 130,
    },
    category: {
        fontSize: 15,
        color: '#088A08',
        position: 'absolute', 
        top: 80, 
        left: 20,
    }, 
    keyCategory: {
        fontSize: 15,
        color: '#82FA58',
        position: 'absolute', 
        top: 80, 
        left: 130,
    },
    locations: {
        fontSize: 15,
        color: '#088A08',
        position: 'absolute', 
        top: 110, 
        left: 20,
    },
    keyLocations: {
        fontSize: 15,
        color: '#82FA58',
        position: 'absolute', 
        top: 110, 
        left: 130,
    },
    like: {
        color: '#82FA58',
        position: 'absolute', 
        top: 160, 
        left: 120,
        width: 150,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3ADF00',
        borderRadius: 30
    },
    viewGallery: {
        top: -40,
        left: windowWidth*0.1/2 ,
        height: 300,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20
    },
    viewItem: {
        top: -65,
        left: windowWidth*0.1/2 ,
        height: 200,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center'
    },
    shadow: {
        shadowColor:  "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1
    },
    viewDesciption: {
        left: windowWidth*0.1/2 ,
        //height: 200,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20
    }
});
export default DetailScreen
