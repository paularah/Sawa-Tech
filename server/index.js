const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('./db/index');
const cors = require('cors');
const path = require('path');

const loginRoutes = require('./routes/login/loginRoute')
const signupRoutes = require('./routes/signup/signupRoutes');

const staticDir = path.resolve(__dirname, '../', 'src');
console.log(staticDir);
// third party middlewares 
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(staticDir));

//routes 
app.use(loginRoutes);
app.use(signupRoutes);

app.listen(3000, () => {
    console.log(`Up and running on port`);
});
