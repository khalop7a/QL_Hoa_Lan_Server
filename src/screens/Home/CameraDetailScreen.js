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

    useEffect(() => {
        let result = [];
        setTimeout(()=>{
            fetch('https://orchid-server.herokuapp.com/api/orchids')
            .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false);
                let check = Math.floor(Math.random() * 10); 
                if(check < 6){
                    setFlag(false);
                }
                for(let i = 0; i < 3; i++){
                    let index = Math.floor(Math.random() * responseJson.length);
                    result.push(responseJson[index]);
                }
                setImagesData(result);
            })
            .catch((error) => {
                console.error(error);
            });
        }, 3000);  
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
