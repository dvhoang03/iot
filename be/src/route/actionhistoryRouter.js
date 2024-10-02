var express = require('express');
var router = express.Router();
const actionhistoryController = require('../controller/actionhistoryController')
router.get('/search', actionhistoryController.search);
router.get('/filter', actionhistoryController.Filter);
router.get('/', actionhistoryController.getdata);

//export this router to use in our index.js
module.exports = router;