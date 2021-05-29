const express = require('express');
const { updatePassword, getUser, getAllUsers, deleteUser, updateUser  } = require('../controllers/userController')
const router = express.Router();

router.put('/user/password/:uid', updatePassword);
router.get('/user/:uid', getUser);
router.get('/users', getAllUsers);
router.post('/user/delete/:uid', deleteUser);
router.put('/user/update/:uid', updateUser);

module.exports = {
    routes: router
}
