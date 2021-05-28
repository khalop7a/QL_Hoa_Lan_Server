const express = require('express');
const { addUser, getUser, getAllUsers, deleteUser, signIn, updateUser  } = require('../controllers/userController')
const router = express.Router();

router.post('/user', addUser);
router.get('/user/:uid', getUser);
router.get('/users', getAllUsers);
router.post('/user/delete/:uid', deleteUser);
router.put('/user/update/:uid', updateUser);
router.post('/sign', signIn);

module.exports = {
    routes: router
}
