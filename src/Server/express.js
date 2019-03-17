var express = require("express");
var app = express();
// var path = require('path')
require('dotenv').config();
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
require('dotenv').config();
const assert = require('assert');

app.use(express.static('src/Components'));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds135619.mlab.com:35619/weight-app`
const dbName = 'weight-app';
const client = new MongoClient(url, { useNewUrlParser: true });

var db;

client.connect(function (err) {
    assert.equal(null, err);
    db = client.db(dbName);
})

// function verifyToken(req, res, next) {
//     var token = req.body.token;
//     if (token) {
//         jwt.verify(token, "Secret", (err, decode) => {
//             if (err) {
//                 res.send("Wrong token")
//             } else {
//                 res.locals.decode = decode
//                 next();
//             }
//         })
//     } else {
//         res.send("No token")
//     }
// }

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(process.env.PORT || 8080, () => {
    var curPort = process.env.PORT;
    if (curPort === undefined) {
        console.log(`listening on localhost://8080`)
        curPort = "localhost://8080"
    } else {
        let d = new Date();
        console.log(`listening on ${curPort} at ${d}`)
    }
})

app.post('/signUpData', (req, res) => {
    if (req.body.username.length && req.body.password.length) {
        db.collection('users').find({ username: req.body.username }).toArray((err, user) => {
            if (user.length) {
                res.json('This username already exists')
            } else {
                bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                    db.collection('users').save({
                        username: req.body.username,
                        password: hash,
                    }, (err, result) => {
                        if (err) {
                            res.json("Failed")
                        } else {
                            res.json("Sign Up Successful")
                        }
                    });
                });
            }
        })
    } else {
        res.json('Error: username or password can\'t be blank')
    }
});