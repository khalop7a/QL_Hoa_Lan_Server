'use strict';

const tf = require('@tensorflow/tfjs')
// Load the binding (CPU computation)
const mobilenet = require('@tensorflow-models/mobilenet');
var fs = require('fs');
// for getting the data images
var image = require('get-image-data')
var result = [];

const infoAI = async (req, res) => {
    res.send(result);
}

const getInfoAI = async (req, res) => {
    fs.readFile(req.file.path,(err, contents)=> {
        if (err) {
            console.log('Error: ', err);
        } else{
            //Convert về hình ảnh quy định của Tensorlow
            image(req.file.path, async function (err, image) {
            const numChannels = 3;
            const numPixels = image.width * image.height;
            const values = new Int32Array(numPixels * numChannels);
            const pixels = image.data
            for (let i = 0; i < numPixels; i++) {
                for (let channel = 0; channel < numChannels; ++channel) {
                    values[i * numChannels + channel] = pixels[i * 4 + channel];
                }
            }
            const outShape = [image.height, image.width, numChannels];
            const input = tf.tensor3d(values, outShape, 'int32');
            await load(input);
            res.send(result);
        });
            async function load(img){
                // Load the model.
                const model = await mobilenet.load();
                // Classify the image.
                const predictions = await model.classify(img);
                //Gửi kết quả vào biến result
                result = [];
                //Tách chuỗi thành các kết quả mong muốn
                let kq = [];
                for(let i = 0; i < 3; i++){
                    kq.push(predictions[i].className.split(","));
                }
                //Tách mảng thì các chuỗi keyword
                result = [].concat.apply([], kq);
                console.log(result);
            }
        }
    });
}

module.exports = {
    getInfoAI,
    infoAI
}
