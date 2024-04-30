//database
require('./config/database').connect();
require('dotenv').config();

//routes
const user = require('./routes/User.routes');
const company = require('./routes/Company.routes');
const menu = require("./routes/menuRouter")
const feedback = require("./routes/feedbackRouter")
const cart = require("./routes/CartRouter")
const admin = require("./routes/adminRouter")

//app
const express = require('express');
const app = express();
const port = 5000;
var cors = require('cors')

//bodyParser
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Home');
});

app.use('/api/v1/user', user);
app.use('/api/v1/company', company);
app.use("/menuRoute", menu)
app.use("/feedback", feedback)
app.use("/cart", cart)
app.use("/admin", admin)

app.listen(port, () => console.log(`Listening on port ${port}`));
