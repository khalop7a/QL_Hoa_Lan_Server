import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RNCamera } from 'react-native-camera';
/*---------------IMPORT AI---------------*/
// import * as tf from "@tensorflow/tfjs";
// import * as mobilenet from '@tensorflow-models/mobilenet';
// import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
// import * as jpeg from 'jpeg-js';
//import '@tensorflow/tfjs-backend-webgl';

const CameraScreen = ({navigation}) => {

    takePicture = async () => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options);
          navigation.navigate('CameraDetailScreen', {
            uri: data.uri,
          });
          //console.log(data.uri);
        }
    };

  /*-----------------AI------------------*/
  // const [url, setUrl] = useState('http://icdn.dantri.com.vn/zoom/1200_630/2019/02/14/camapdocx-1550156095359.jpeg')
  // const [displayText, setDisplayText] = useState("loading");
  //   async function getPrediction(url){
  //     setDisplayText("Loading Tensor Flow")
  //     await tf.ready();
  //     setDisplayText("Loading Mobile Net");
  //     const model = await mobilenet.load();
  //     console.log("Kha: " +  model);
  //     setDisplayText("Fetching Image");
  //     const response = await fetch(url, {}, {isBinary: true});
  //     setDisplayText("Getting Image Buffer");
  //     const imageData = await response.arrayBuffer();
  //     setDisplayText("Getting Image Tensor");
  //     const imageTensor = imageToTensor(imageData);
  //     setDisplayText("Getting Classification Result");
  //     const prediction = await model.classify(imageTensor);
  //     setDisplayText(JSON.stringify(prediction)); 
  //  } 

  //   function imageToTensor(rawData){
  //     const { width, height, data } = jpeg.decode(rawData, true);
  //     const buffer = new Uint8Array(width*height*3);
  //     let offset= 0;
  //     for(let i = 0; i < buffer.length; i+=3){
  //       buffer[i] = data[offset]; //Read
  //       buffer[i+1] = data[offset + 1]; //Green
  //       buffer[i+2] = data[offset + 2]; //Blue
  //       offset += 4; //Skip Alpha Value
  //     } 
  //     return tf.tensor3d(buffer, [height, width, 3]);

  //   }

    return (
        <View style={styles.container}>
          {/* <Text>Only works with Jpeg images</Text>
          <TextInput 
            style={{width: '90%', height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={text => setUrl(text)}
            value={url}
          />
          <Image style={styles.imageStyle} source={{uri: url}}></Image>
          <TouchableOpacity style={{width: 150, height: 30, backgroundColor: 'green'}}
            onPress = {() => getPrediction(url)
            //onPress = {() => console.log("1")
            }>
            <Text>Classify Image</Text>
          </TouchableOpacity>
          <Text>{displayText}</Text> */}
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            //console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SCAN </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
      marginBottom: 70
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    imageStyle: {
      width: 300,
      height: 300
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
});

export default CameraScreen
