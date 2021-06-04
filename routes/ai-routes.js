const express = require('express');
const { getInfoAI, infoAI  } = require('../controllers/aiController')
const router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' })

router.post('/upload', upload.single('fileData') ,getInfoAI);
router.get('/download', infoAI);

module.exports = {
    routes: router
}
