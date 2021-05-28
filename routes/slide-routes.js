const express = require('express');
const { getAllSlides } = require('../controllers/slideController')
const router = express.Router();

router.get('/slides', getAllSlides);

module.exports = {
    routes: router
}
