'use strict';

const firebase = require('../db');
const Silde = require('../models/slide');
const firestore = firebase.firestore();

const getAllSlides = async (req, res) => {
    try{
        const feeds = await firestore.collection('slide_orchids');
        
        const data = await feeds.get();
        const feedsArray = [];
        if (data.empty){
            res.status(404).send('No account record found');
        }
        else{
            data.forEach(element => {
                const feed = new Silde(
                    element.id,
                    element.data().image
                );
                feedsArray.push(feed);
            });
            res.send(feedsArray);
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllSlides,
}