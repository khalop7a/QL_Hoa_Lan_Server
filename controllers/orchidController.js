'use strict';

const firebase = require('../db');
const Orchid = require('../models/orchid');
const firestore = firebase.firestore();

const getAllOrchids = async (req, res) => {
    try{
        const orchids = await firestore.collection('orchids');
        
        const data = await orchids.get();
        const orchidsArray = [];
        if (data.empty){
            res.status(404).send('No orchid record found');
        }
        else{
            data.forEach(element => {
                console.log(element)
                const orchild = new Orchid(
                    element.id,
                    element.data().category,
                    element.data().description,
                    element.data().humidity,
                    element.data().intermediate,
                    element.data().location,                   
                    element.data().name,
                    element.data().url_m,
                    element.data().science_name,                   
                    element.data().warm,
                    element.data().note
                );
                orchidsArray.push(orchild);
            });
            res.send(orchidsArray);
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getOrchid = async(req, res, next) => {
    try{
        const uid = req.params.uid;
        const orchid = await firestore.collection('orchids').doc(uid);
        const data = await orchid.get();
        if (!data.exists){
            res.status(404).send('Orchid with the given ID not found');
        }else{
            res.send(data.data());
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllOrchids,
    getOrchid
}