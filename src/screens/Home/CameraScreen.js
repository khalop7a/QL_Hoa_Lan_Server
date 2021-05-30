import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from 'react-native'
import { RNCamera } from 'react-native-camera';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from "@tensorflow/tfjs";
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';


const CameraScreen = () => {

    const [url, setUrl] = useState('https://cdn.britannica.com/79/65379-050-5CF52BAC/Shortfin-mako-shark-seas.jpg')
    const [displayText, setDisplayText] = useState("loading");

    takePicture = async () => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options);
          console.log(data.uri);
        }
    };

    getPrediction = async (url) => {
      setDisplayText("Loading Tensor Flow")
      await tf.ready();
      setDisplayText("Loading Mobile Net");
      const model = await mobilenet.load();
    //   setDisplayText("Fetching Image");
    //   const response = await fetch(url, {}, {isBinary: true});
    //   setDisplayText("Getting Image Buffer");
    //   const imageData = await response.arrayBuffer();
    //   setDisplayText("Getting Image Tensor");
    //   const imageTensor = imageToTensor(imageData);
    //   setDisplayText("Getting Classification Result");
    //   prediction = await model.classify(imageTensor);
    //   setDisplayText(JSON.stringify(prediction)); 
   } 

    // imageToTensor = (rawData) => {
    //   const { width, height, data } = jpeg.decode(rawData, true);
    //   const buffer = new Uint8Array(width*height*3);
    //   let offset= 0;
    //   for(let i = 0; i < buffer.length; i+=3){
    //     buffer[i] = data[offset]; //Read
    //     buffer[i+1] = data[offset + 1]; //Green
    //     buffer[i+2] = data[offset + 2]; //Blue
    //     offset += 4; //Skip Alpha Value
    //   } 
    //   return tf.tensor3d(buffer, [height, width, 3]);
    // }

    return (
        <View style={styles.container}>
          <Text>Only works with Jpeg images</Text>
          <TextInput 
            style={{width: '90%', height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={text => setUrl(text)}
            value={url}
          />
          <Image style={styles.imageStyle} source={{uri: url}}></Image>
          <TouchableOpacity style={{width: 150, height: 30, backgroundColor: 'green'}}
            onPress = {() => getPrediction(url)}
          >
            <Text>Classify Image</Text>
          </TouchableOpacity>
          <Text>{displayText}</Text>
        {/* <RNCamera
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
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      //backgroundColor: 'black',
      marginBottom: 70
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    imageStyle: {
      width: 200,
      height: 200
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
