'use strict';

const firebase = require('../db');
const Feed = require('../models/feed');
const firestore = firebase.firestore();

const getAllFeeds = async (req, res) => {
    try{
        const feeds = await firestore.collection('feeds');
        
        const data = await feeds.get();
        const feedsArray = [];
        if (data.empty){
            res.status(404).send('No account record found');
        }
        else{
            data.forEach(element => {
                const feed = new Feed(
                    element.id,
                    element.data().title,
                    element.data().image_url,
                    element.data().content,
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
    getAllFeeds,
}