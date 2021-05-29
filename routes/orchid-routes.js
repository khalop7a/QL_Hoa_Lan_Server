const express = require('express');
const { getAllOrchids, getOrchid} = require('../controllers/orchidController')
const router = express.Router();

router.get('/orchids', getAllOrchids);
router.get('/orchid/:uid', getOrchid);

module.exports = {
    routes: router
}
