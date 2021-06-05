import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
    View, 
    Text,
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Image,
    ActivityIndicator
} from 'react-native';
import { images, icons } from '../../constants';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const HomeScreen = ({navigation}) => {
    
    const [index, setIndex] = useState(0);
    const indexRef = useRef(index);
    const [data, setData] = useState([]);
    const _isMounted = useRef(true);
    const [loading, setLoading] = useState(true);
    indexRef.current = index;

    const onScroll = useCallback((event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
    
        const distance = Math.abs(roundIndex - index);
    
        const isNoMansLand = 0.4 < distance;
    
        if (roundIndex !== indexRef.current && !isNoMansLand) {
          setIndex(roundIndex);
        }
    }, []);

    useEffect(() => {
      fetch('https://orchidapp.herokuapp.com/api/slides')
      .then((response) => response.json())
      .then((responseJson) => {
          setData(responseJson);
          setLoading(false);
      })
      .catch((error) => {
          console.error(error);
      });
    return () => { _isMounted.current = false; };
    }, [index])

    function Pagination({ index }) {
        return (
          <View style={styles.pagination} pointerEvents="none">
            {data.map((_, i) => {
              return (
                <View
                  key={i}
                  style={[
                    styles.paginationDot,
                    index === i
                      ? styles.paginationDotActive
                      : styles.paginationDotInactive,
                  ]}
                />
              );
            })}
          </View>
        );
    }

    const flatListOptimizationProps = {
        initialNumToRender: 0,
        maxToRenderPerBatch: 1,
        removeClippedSubviews: true,
        scrollEventThrottle: 16,
        windowSize: 2,
        getItemLayout: useCallback(
        (_, index) => ({
            index,
            length: windowWidth,
            offset: index * windowWidth,
        }),
        []
        ),
    };

    function Slide(props) {
        return (
          <View
            style={{
              height: windowHeight*0.4,
              width: windowWidth,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: props.data }}
              style={{ width: windowWidth * 0.9, height: windowHeight * 0.3, borderRadius: 20 }}
            ></Image>
          </View>
        );
    }   

    return (
        <SafeAreaView style={{flex: 1, position: 'relative'}}>
            <ImageBackground
                source = {images.background}
                resizeMode = 'cover'
                style = {{flex: 0.3, marginHorizontal: 10}}
                imageStyle={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}
            >
                <Text style={styles.homeText}>Hoa Lan</Text>
            </ImageBackground>        
              <View style={{ flex: 0.4, marginBottom: 10}}>
              {
                (loading) ? 
                (
                  <ActivityIndicator size="large" color="#00ff00" style={{position: 'absolute', top: 100, left: 190}}/>
                ):
                (
                  <View style={{ flex: 1}}>
                    <FlatList
                      data={data}
                      style={{ flex: 1 }}
                      keyExtractor={(item) => item.id}
                      renderItem={( {item} ) => {
                          return <Slide data={item.image} />;
                      }}
                      pagingEnabled
                      horizontal
                      bounces={false}
                      showsHorizontalScrollIndicator={false}
                      onScroll={onScroll}
                      {...flatListOptimizationProps}
                    />
                    <Pagination index={index}></Pagination>
                  </View>
                )
              }         
              </View>
          
            <TouchableOpacity 
              style={{
                flex: 0.2, 
                flexDirection: 'row', 
                backgroundColor: '#CEF6F5',
                margin: 15,      
                marginTop: 0       
              }}
              onPress={() => navigation.navigate('NewsScreen')}
            >        
                <View style={{flex: 0.4, justifyContent: 'center'}}>
                  <Image 
                    source = {images.daily}
                    resizeMode = 'stretch'
                    style = {{ height: 100, width: 150, margin: 10, borderRadius: 10 }}
                  />
                </View>
                <View style={{flex: 0.6, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: 'green'}}>Đọc tin tức</Text>
                    <Text style={{fontSize: 17, textAlign: 'center', color: 'black', paddingLeft: 15}}>
                      Việc đọc rất quan trọng. Nếu bạn biết cách đọc, cả thế giới sẽ mở ra cho bạn
                    </Text>
                    <Image 
                    source = {icons.arrow}
                    resizeMode = 'contain'
                    style = {{ height: 30, width: 30 }}
                  />
                </View>
            </TouchableOpacity>
        </SafeAreaView>      
    );
}

const styles = StyleSheet.create({
    homeText: {
        position: 'absolute',
        bottom: 20,
        left: 30,
        fontSize: 25,
        color: 'green',
        fontWeight: 'bold'
    },
    pagination: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
      },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 2,
    },
    paginationDotActive: { backgroundColor: "lightblue" },
    paginationDotInactive: { backgroundColor: "gray" },

    carousel: { flex: 1 },
});

export default HomeScreen;
