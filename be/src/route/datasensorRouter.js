var express = require('express');
var router = express.Router();

const datasensorController = require('../controller/datasensorController')

router.get('/search', datasensorController.search)

router.get('/sort',datasensorController.sort );
router.get('/',datasensorController.getdata );



//export this router to use in our index.js
module.exports = router;