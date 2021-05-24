// whatsapp://send?text=hi1
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./userDetails');
const UserMessage = require('./messages');
const port = 8000;
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var jwt = require('jsonwebtoken');

app.use(express.urlencoded());
app.use(express.json({ limit: '100mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json('application/json'));
app.use(cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200 }));
// passport middleware
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect('mongodb://localhost/WhatsAppSender', { useNewUrlParser: true, useUnifiedTopology: true });

// SignUp End Point
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
            user.email = req.body.email;
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
                    let userMessages = new UserMessage();
                    userMessages.userName = req.body.userName;
                    userMessages.messages = [];
                    userMessages.save((err, success) => {
                        if(err) {
                            es.send({
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
        }
    });
});

// LogIn End Point

app.post("/logIn", (req, res) => {
    User.findOne({userName : req.body.userName, password : req.body.password}, (err, success) => {
        if(success){
            userName = req.body.userName
            user = {
                userName : userName
            }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.send({
                success : true,
                message : "SignUp Successfully",
                accessToken : accessToken
            });
            
        }
        else {
            res.send({
                success : false,
                message : "User Not Registered",
                data : err
            });
        }
    });
});

// add Message endpoint

app.post('/addMessage', authenticateToken, (req, res) => {
    UserMessage.findOne({userName : req.user.userName}, {messages : 1, _id : 0}, (err, success) => {
        let messages = success.messages;
        for (message of messages) {
            if(message['title'] == req.body.title) {
                return res.send({
                    success : false,
                    message : "Message Names Should Be Unique",
                    data : null
                });
            }
        }
        UserMessage.updateOne({userName : req.user.userName}, {
            $push : {
                messages : req.body
            }
        }, (err, success) => {
            if(err) {
                res.send({
                    success : false,
                    messge : "Error With Updting Database",
                    data : err
                });
            }
            else {
                res.send({
                    success : true,
                    message : "Message Added Successfully",
                    data : null
                });
            }
        });
    })
    
});

// get Messages endpoint
app.get('/getMessages', authenticateToken, (req, res) => {
    UserMessage.findOne({userName : req.user.userName}, (err, success) => {
        if(err) {
            res.send({
                success : "false",
                message : "messges not found",
                data : err
            });
        }
        else {
            res.send ({
                success : "true",
                message : "Messages Found",
                data : success.messages
            });
        }
    });
});

// delete message endpoint
app.get('/deleteMessage', authenticateToken, (req, res) => {
    UserMessage.updateOne({userName : req.user.userName}, {
        $pull : {
            messages : {
                title : req.headers['title']
            }
        }
    }, (err, success) => {
        if(err) {
            res.send({
                success : false, 
                message : "Message Is Not Deleted. Please Try Again!",
                data : err
            })
        }
        else {
            res.send({
                success : true,
                message : "Message Deleted Succefully",
                data : null
            })
        }
    })
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    if(authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) {
                return res.sendStatus(403);
            }
            else {
                req.user = user;
                next();
            }
        });

    }
    else {
        return res.sendStatus(401);
    }
    

}

app.listen(port, () => {
    console.log(`server is start on ${port}`);
});
