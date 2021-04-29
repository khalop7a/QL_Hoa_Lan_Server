const express = require('express');
const { addHoalan, getAllHoalan, getHoalan, updateHoalan, deleteHoalan } = require('../controllers/hoalanController');

const router = express.Router();

router.post('/hoalan', addHoalan);
router.get('/hoalans', getAllHoalan);
router.get('/hoalan/:id', getHoalan);
router.put('/hoalan/:id', updateHoalan);
router.delete('/hoalan/:id', deleteHoalan);

module.exports = {
    routes: router
}