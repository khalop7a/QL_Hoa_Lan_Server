import React, { Component, useEffect, useState, useRef } from 'react';
import {
    TouchableOpacity, 
    Image, FlatList, 
    ActivityIndicator, 
    StyleSheet, 
    View, 
    TextInput,
    SafeAreaView,
    Text,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { icons } from '../../constants';

class ImageComponent extends Component {
    constructor() {
      super();
    }
    render() {
      return (
        <View style={styles.imageHolder}>
          <Image source={{ uri: this.props.imageURI }} style={styles.image} />
          <View style={styles.textViewHolder}>
            <Text numberOfLines={1} style={styles.textOnImage}>
              {this.props.name}
            </Text>
          </View>
        </View>
      );
    }
}

const FeedScreen = () => {

    const [loading, setLoading] = useState(true);
    const [imagesData, setImagesData] = useState("");
    const [gridView, setGridView] = useState(true);
    const [btnView, setbtnView] = useState(icons.gridView);
    const [search, setSearch] = useState("");
    const [masterDataSource, setMasterDataSource] = useState([]);
    const _isMounted = useRef(true);

    useEffect(() => {
        fetch('https://picsum.photos/v2/list?page=2&limit=30')
        .then((response) => response.json())
        .then((responseJson) => {
            setImagesData(responseJson);
            setMasterDataSource(responseJson);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
        });
      return () => { _isMounted.current = false; };
    }, [])

    changeView = () => {
        setGridView(gridView => !gridView);
        if(gridView){
          setbtnView(icons.listView)
        }
        else{
          setbtnView(icons.gridView)
        }
      }
    
    updateSearch = (text) => {
      // Check if searched text is not blank
      if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource
        // Update FilteredDataSource
        const newData = masterDataSource.filter(
          function (item) {
            console.log(item.author)
            const itemData = item.author
              ? item.author.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setImagesData(newData);
        setSearch(text);
      } else {
        setImagesData(masterDataSource);
        setSearch(text);
      }
    };

    return (
        <SafeAreaView  style={styles.container} >
        {
          (loading)
            ?
            (<View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>Please Wait...</Text>
            </View>)
            :
            (<View style={{ flex: 1}}>                    
                {/* <TextInput
                      style={styles.textInputStyle}
                      onChangeText={(text) => updateSearch(text)}
                      value={search}
                      underlineColorAndroid="transparent"
                      placeholder="Search Here"
                /> */}
                  <SearchBar
                    round
                    lightTheme
                    searchIcon={{ size: 24 }}
                    onChangeText={(text) => updateSearch(text)}
                    onClear={(text) => updateSearch('')}
                    placeholder="Search for plants"
                    value={search}
                  />
                <TouchableOpacity activeOpacity={0.8} style={styles.buttonDesign} onPress={this.changeView}>
                    <Image
                    source={btnView}
                    resizeMode = 'contain'
                    style = {{width: 30, height: 30}}
                /> 
                </TouchableOpacity>
             
                <FlatList 
                  keyExtractor={(item) => item.id}
                  key={(gridView) ? 1 : 0}
                  numColumns={gridView ? 2 : 1}
                  data={imagesData}
                  renderItem={({ item }) =>
                    <ImageComponent imageURI={item.download_url} name={item.author.toUpperCase()} />
                  } />
              
            </View>)
        }
      </SafeAreaView>
    )
}

const styles = StyleSheet.create(
    {
      container: {
        flex: 1,
      },
      imageHolder: {
        margin: 5,
        height: 160,
        flex: 1,
        position: 'relative'
      },
      image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
      },
      textViewHolder: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        paddingHorizontal: 10,
        paddingVertical: 13,
        alignItems: 'center'
      },
      textOnImage: {
        color: 'white'
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      loadingText: {
        paddingTop: 10,
        fontSize: 18,
        color: 'black'
      },
      buttonDesign: {
        padding: 10,
        alignItems: 'center'
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
        alignSelf: 'stretch'
      },
      textInputStyle: {
        //flex: 0.8,
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
      },
});

export default FeedScreen
