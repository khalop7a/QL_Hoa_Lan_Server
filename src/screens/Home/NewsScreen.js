import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
    View, 
    Text,
    SafeAreaView,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    ImageBackground,
} from 'react-native';
import {BackButton} from '../../components';

const ImageComponent = (props) => {
    const [textShown, setTextShown] = useState(false);  //To show ur remaining Text
    const [lengthMore,setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }

    const onTextLayout = useCallback(e =>{
        setLengthMore(e.nativeEvent.lines.length >=4); //to check the text is more than 4 lines or not
    },[]);

    return(
        <View style = {styles.viewHolder}>
            <ImageBackground source={{ uri: props.imageURI }} style={styles.image} />
            <Text style = {styles.textHolder}>{props.name}</Text>
            <View>  
                <Text 
                    style={[styles.contentHolder, {lineHeight: 21, textAlign: 'justify', paddingRight: 10}]}
                    numberOfLines={textShown ? undefined : 4}
                    onTextLayout = {onTextLayout}
                >
                    {props.content}
                </Text>    
                {
                  lengthMore ? <Text
                  onPress={toggleNumberOfLines}
                  style={{ lineHeight: 21, marginTop: 10, fontSize: 20, color: 'green' }}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                  :null
                } 
            </View>    
        </View>
    );
}

const NewsScreen = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const _isMounted = useRef(true);

    useEffect(() => {
        fetch('http://192.168.1.16:8080/api/feeds')
        .then((response) => response.json())
        .then((responseJson) => {
            setData(responseJson);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
        });
      return () => { _isMounted.current = false; };
    }, [])

    return (
        <SafeAreaView style={{flex: 1}}>
        {
        (loading) ?
            (<View style={styles.loadingContainer}>
              <BackButton goBack={navigation.goBack} />
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>Please Wait...</Text>
            </View>
            ):
            (  
                <View style = {{backgroundColor: 'white'}}>
                    <BackButton goBack={navigation.goBack} />
                    <FlatList 
                    keyExtractor={(item) => item.feed_id}
                    data={data}
                    renderItem={({ item }) =>
                        <ImageComponent 
                            imageURI={item.image_url} 
                            name={item.title} 
                            content = {item.content}
                        />
                    }/>
                </View>
            )
        }
        </SafeAreaView>      
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHolder: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 21
    },
    image: {
        flex: 1,
        height: 250,
        margin: 5,
    },
    contentHolder: {
        fontSize: 20,
    },
    viewHolder: {
        backgroundColor: 'white',
        opacity: 0.95,
        borderRadius: 10,
        height: 'auto',
        padding: 10
    },
});

export default NewsScreen;
