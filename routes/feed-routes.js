const express = require('express');
const { getAllFeeds } = require('../controllers/feedController')
const router = express.Router();

router.get('/feeds', getAllFeeds);

module.exports = {
    routes: router
}
