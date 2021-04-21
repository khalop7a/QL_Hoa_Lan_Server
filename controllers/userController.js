'use strict';

const admin = require('../db');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//const user = new User();
const addUser = async (req, res) => {
    await bcrypt.hash(req.body.user.password, saltRounds, (err, hash)=>{
    try {  
       const user = new User(
           req.body.uid,
           req.body.user.email,
           false,
           req.body.user.phone,
           hash,
           req.body.user.name,
           req.body.photoURL,
           false
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
        const user = await admin.auth().getUser(req.params.uid);
        res.json(user)
    }
    catch(e){
        res.json({message:'Cannot fetch user data'})
    }
}

const getAllUsers = async (req, res) => {
    const usersResult =   await admin.auth().listUsers(1000)
    res.json(usersResult.users)
}

const deleteUser = async (req, res) => {
    admin.auth().deleteUser(req.params.id)
    res.json({message:'done'})
}

const updateUser = async (req, res) => {
    try {
        const user = await admin.auth().updateUser(req.params.uid,{
            email: req.body.user.email,
            emailVerified: false,
            phoneNumber:req.body.user.phone,
            password:req.body.user.password,
            displayName:req.body.user.name,
            photoURL: req.body.user.photoURL,
            disabled:false
        })
        res.json(user)
    } catch(e){
        res.json({message:e})
    }
}

const signIn = async (req, res) => {
    try{
        const user = await admin.auth().getUserByEmail(req.body.user.email)
        {
            try{
                    const token =await admin.auth().createCustomToken(req.body.user.email)
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
    signIn
}