// whatsapp://send?text=hi1

const express = require('express');
const app = express();
const user = require('./userDetails');
const userMessage = require('./messages');
const port = 8000;
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(express.urlencoded());
app.use(express.json({ limit: '100mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json('application/json'));
app.use(cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200 }));

mongoose.connect('mongodb://localhost/WhatsAppSender', { useNewUrlParser: true, useUnifiedTopology: true });

