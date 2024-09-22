
const express = require('express')
const app = express()
const port = 4000
const actionhistory = require('./src/route/actionhistoryRouter');
const datasensor = require('./src/route/datasensorRouter');
const dashboard = require('./src/route/dashboardRouter');
const bodyParser = require('body-parser');
const client = require('./src/services/mqtt')
const cors = require('cors');
// const app = express();

// Sử dụng middleware cors
app.use(cors());

app.use(express.json());

// Middleware để phân tích dữ liệu từ các form (optional)
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/dashboard", dashboard);
app.use("/datasensor", datasensor);
app.use("/actionhistory", actionhistory);


// app.get('*', function(req, res){
// res.send('Sorry, this is an invalid URL.');
// });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})