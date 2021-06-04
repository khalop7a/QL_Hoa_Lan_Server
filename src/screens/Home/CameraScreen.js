import React, {useState} from 'react'
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
} from 'react-native'
import { RNCamera } from 'react-native-camera';
import axios from 'axios';

const CameraScreen = ({navigation}) => {

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      //Get dữ liệu
      const datum = new FormData();
      datum.append('name', 'avatar');
      datum.append('fileData', {
        uri : data.uri,
        type: "image/jpeg",
        name: data.uri.substring(data.uri.lastIndexOf("/") + 1, data.uri.length)
      });
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
      //Chờ kết quả phản hồi
      const res = await axios.get('http://192.168.1.16:8080/api/download');
      console.log(res.data)
        // navigation.navigate('CameraDetailScreen', {
        //   uri: data.uri,
        // });
      }
  };

  return (
      <View style={styles.container}>
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
      flex: 1
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
    titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingVertical: 20,
    },
    textStyle: {
      padding: 10,
      color: 'black',
    },
    buttonStyle: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#DDDDDD',
      padding: 5,
    },
    imageStyle: {
      width: 200,
      height: 200,
      margin: 5,
    },
});

export default CameraScreen
