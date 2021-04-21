'use strict';

const firebase = require('../db');
const Account = require('../models/account');
const firestore = firebase.firestore();

const addAccount = async(req, res, next) => {
    try{
        const data = req.body;
        await firestore.collection('accounts').doc().set(data);
        res.send('Record saved successfuly');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getAllAccounts = async(req, res, next) => {
    try{
        const accounts = await firestore.collection('accounts');
        const data = await accounts.get();
        const accountsArray = [];
        if (data.empty){
            res.status(404).send('No account record found');
        }
        else{
            data.forEach(element => {
                const account = new Account(
                    element.id,
                    element.data().firstName,
                    element.data().lastName,
                    element.data().age,
                    element.data().phoneNumber,
                    element.data().status
                );
                accountsArray.push(account);
            });
            res.send(accountsArray);
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getAccount = async(req, res, next) => {
    try{
        const id = req.params.id;
        const account = await firestore.collection('accounts').doc(id);
        const data = await account.get();
        if (!data.exists){
            res.status(404).send('Account with the given ID not found');
        }else{
            res.send(data.data());
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const updateAccount = async(req, res, next) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const account = await firestore.collection('accounts').doc(id);
        await account.update(data);
        res.send('Account record updated successfuly');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const deleteAccount = async(req, res, next) => {
    try{
        const id = req.params.id;
        await firestore.collection('accounts').doc(id).delete();
        res.send('Record deleted successfuly');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addAccount,
    getAllAccounts,
    getAccount,
    updateAccount,
    deleteAccount
}