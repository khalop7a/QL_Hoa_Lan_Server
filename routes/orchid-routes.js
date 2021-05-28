const express = require('express');
const { getAllOrchids} = require('../controllers/orchidController')
const router = express.Router();

router.get('/orchids', getAllOrchids);

module.exports = {
    routes: router
}
