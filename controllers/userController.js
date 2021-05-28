'use strict';

const admin = require('../db');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const firestore = admin.firestore();

const saltRounds = 10;

const addUser = async (req, res) => {
    await bcrypt.hash(req.body.user.password, saltRounds, (err, hash)=>{
        try {  
            const user = new User(
                req.body.user.uid,
                req.body.user.email,
                hash,
                req.body.user.name,
                req.body.user.favourite
            );
            admin.auth().createUser(
                user
            )
            res.json({message:'User Created'})
        } 
        catch(e){
            console.log(e)
            res.json({message:'Error creating user'})
        }
    })
}

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
        //console.log(uid);
        const data = req.body;
        const user = await firestore.collection('users').doc(uid);
        await user.update(data);
        res.send('Account record updated successfuly');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const signIn = async (req, res) => {
    try{
        const user = await admin.auth().getUserByEmail(req.body.email)
        //await admin.auth().
        {
            try{
                    const token =await admin.auth().createCustomToken(req.body.email)
                    res.json(token)
                    
                } 
            catch(e){
                console.log(e)
                res.json({message:'Error Generating Token!Please try again'})
            }
        }
    }
    catch(e){
        res.json({message:'No user record found'})
    }
}

module.exports = {
    addUser,
    getUser,
    getAllUsers,
    deleteUser,
    updateUser,
    signIn,
}