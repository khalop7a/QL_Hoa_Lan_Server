const express = require('express');
const { addUser, getUser, getAllUsers, deleteUser, updateUser, signIn } = require('../controllers/userController')
const router = express.Router();

router.post('/user', addUser);
router.post('/user/details/:uid/', getUser);
router.get('/users', getAllUsers);
router.post('/user/delete/:uid', deleteUser);
router.post('/user/update/:uid', updateUser);
router.post('/sign', signIn);
module.exports = {
    routes: router
}