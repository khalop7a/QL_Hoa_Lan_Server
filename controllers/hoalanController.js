'use strict';

const firebase = require('../db');
const HoaLan = require('../models/hoalan');
const firestore = firebase.firestore();

const addHoalan = async(req, res, next) => {
    try{
        const data = req.body;
        await firestore.collection('hoalan').doc().set(data);
        res.send('Record saved successfuly');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getAllHoalan = async(req, res, next) => {
    try{
        const hoalan = firestore.collection('hoalan');
        const data = await hoalan.get();
        const hoalanArray = [];
        if (data.empty){
            res.status(404).send('No hoalan record found');
        }
        else{
            data.forEach(element => {
                const hoalan = new HoaLan(
                    element.id,
                    element.data().tenhoa,
                    element.data().mausac,
                    element.data().gia,
                    element.data().hinhanh,
                    element.data().mota
                );
                hoalanArray.push(hoalan);
            });
            res.send(hoalanArray);
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getHoalan = async(req, res, next) => {
    try{
        const id = req.params.id;
        const hoalan = firestore.collection('hoalan').doc(id);
        const data = await hoalan.get();
        if (!data.exists){
            res.status(404).send('Orchild with the given ID not found');
        }else{
            res.send(data.data());
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const updateHoalan = async(req, res, next) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const hoalan = firestore.collection('hoalan').doc(id);
        await hoalan.update(data);
        res.send('hoalan record updated successfuly');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const deleteHoalan = async(req, res, next) => {
    try{
        const id = req.params.id;
        await firestore.collection('hoalan').doc(id).delete();
        res.send('Record deleted successfuly');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addHoalan,
    getAllHoalan,
    getHoalan,
    updateHoalan,
    deleteHoalan
}