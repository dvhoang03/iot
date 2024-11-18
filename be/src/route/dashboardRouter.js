var express = require('express');
var router = express.Router();
const dashboard = require('../controller/dashboardController')

router.post('/controll',dashboard.controll);
router.get('/getwarn',dashboard.getwarn);
router.get('/getchart',dashboard.getchart);


//export this router to use in our index.js
module.exports = router;