const express = require('express');
const { addAccount, getAllAccounts, getAccount, updateAccount, deleteAccount } = require('../controllers/accountController');

const router = express.Router();

router.post('/account', addAccount);
router.get('/accounts', getAllAccounts);
router.get('/account/:id', getAccount);
router.put('/account/:id', updateAccount);
router.delete('/account/:id', deleteAccount);

module.exports = {
    routes: router
}