// whatsapp://send?text=hi1

const express = require('express');
const app = express();
const User = require('./userDetails');
const UserMessage = require('./messages');
const port = 8000;
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(express.urlencoded());
app.use(express.json({ limit: '100mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json('application/json'));
app.use(cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200 }));

mongoose.connect('mongodb://localhost/WhatsAppSender', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/signUp', (req, res) => {
    User.findOne({userName : req.body.userName}, (err, success) => {
        if(success) {
            res.send({
                success : false,
                message : "User Is Already Exist",
                data : null
            });
        }
        else {
            let user = new User()
            user.userName = req.body.userName;
            user.password = req.body.password;
            user.save((err, success) => {
                if(err) {
                    res.send({
                        success : false,
                        message : "Not Registered Yet, Please Register Again",
                        data : err
                    });
                }
                else {
                    res.send({
                        success : true,
                        message : "Registered Successfully",
                        data : null
                    });
                }
            });
        }
    });
});

