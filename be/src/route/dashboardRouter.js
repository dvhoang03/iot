var express = require('express');
var router = express.Router();
const dashboard = require('../controller/dashboardController')

router.post('/controll',dashboard.controll);


//export this router to use in our index.js
module.exports = router;