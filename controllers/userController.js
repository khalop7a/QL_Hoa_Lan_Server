'use strict';

const admin = require('../db');
const User = require('../models/user');
const firestore = admin.firestore();

const getUser = async (req, res) => {
    try{
        const uid = req.params.uid;
        const user = await firestore.collection('users').doc(uid);
        const data = await user.get();
        if (!data.exists){
            res.status(404).send('User with the given ID not found');
        }else{
            res.send(data.data());
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

// const infoAI = async (req, res) => {
//     console.log(result);
//     //res.send(JSON.parse(result));
// }

const getAllUsers = async (req, res) => {
    try{
        const users = await firestore.collection('users');
        const data = await users.get();
        const usersArray = [];
        if (data.empty){
            res.status(404).send('No user record found');
        }
        else{
            data.forEach(element => {
                const user = new User(
                    element.id,
                    element.data().email,
                    element.data().displayName,
                    element.data().favourite,
                );
                usersArray.push(user);
            });
            res.send(usersArray);
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res) => {
    admin.auth().deleteUser(req.params.id)
    res.json({message:'done'})
}

const updateUser = async(req, res, next) => {
    try{
        const uid = req.params.uid;
        const data = req.body;
        const user = await firestore.collection('users').doc(uid);
        await user.update(data);
        res.send('Account record updated successfuly');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    getUser,
    getAllUsers,
    deleteUser,
    updateUser,
}