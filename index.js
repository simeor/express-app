const express = require('express');
const path = require('path');
const logger = require("./middleware/logger");

// init express
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//init middle
// app.use(logger);

//router setup
app.use('/api/members',require('./routes/api/members'));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
