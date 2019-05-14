'use strict'
const http = require('http');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Subjects = require('./Subject-list.js');

const hostname = '127.0.0.1';
const port = 3000; // Change for Heroku

//TODO: Change the secret key
const secretkey = 'Bueb-ito';

let app = express();
app.listen(port, () => console.log(`Connection on port ${port}!`));

let jsonParser = bodyParser.json();
let corsOptions = {
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200
}

const subjects = new Subjects();
const users = JSON.parse(fs.readFileSync('users.json'));

let tokensWhiteList = [];

app.use(cors(corsOptions));
app.use(jsonParser);

app.route('/api/subjects')
    .get((req, res) => {
        res.json(subjects.subjects);
    })
    .post(verifyToken, checkParameters, (req, res) => {
        if(subjects.addSubject(req.body)) {
            res.status(201).send();
        } else {
            res.status(400).send("Error. The code of the subject already exists");
        }
    });

app.route('/api/subjects/:code')
    .get((req, res) => {
        if(req.params.code) {
            let subject = subjects.find(req.params.code);
            if(subject) {
                res.json(subject);
            } else {
                res.status(400).send("Error. Subject doesn't exist");
            }

        } else {
            res.status(400).send("Error. Code required");
        }
    })
    .patch(verifyToken, partialCheckParameters, (req, res) => {
        let code = req.params.code;
        if(subjects.modifySubject(code, req.body)) {
            res.status(200).json(req.body);
        } else {
            res.status(400).send("Subject not found or code already exists");
        }
    });

app.route('/api/login')
    .post((req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        let user = users.find(u => u.username == username && u.password == password);

        if(user) {
            jwt.sign(user, secretkey, (err, token) => {
                tokensWhiteList.push(token);
                
                res.header('auth', token)
                    .status(200)
                    .send();
            })
        } else {
            res.status(400).send("User not found");
        }
    });

app.route('/api/logout')
    .post(verifyToken, (req, res) => {
        const token = req.header('auth');
        const tokenIndex = tokensWhiteList.findIndex(t => t == token);

        if(tokenIndex != -1) {
            tokensWhiteList.splice(tokenIndex, 1);
            //fs.writeFileSync('tokens.json', tokensWhiteList);
            res.status(200).send();
        } else {
            req.status(400).send("Error ocurred");
        }
    });

function verifyToken(req, res, next) {
    const token = req.header('auth');

    if(token && tokensWhiteList.find(t => t == token)) {
        jwt.verify(token, secretkey, (err, authData) => {
            next();
        })
    } else {
        res.status(403).send();
    }
}

function checkParameters(req, res, next) {
    //Body must have only these variables in order to add the subject
    let codeFlag = false;
    let nameFlag = false;
    let descriptionFlag = false;
    let creditsFlag = false;
    let areaFlag = false;
    let departmentFlag = false;
    let groupsFlag = false;
    let tooMuchParametersFlag = false;

    for(let param in req.body) {
        switch(param){
            case('code'):
                codeFlag = true;
                break;
            
            case('name'):
                nameFlag = true;
                break;
            
            case('description'):
                descriptionFlag = true;
                break;

            case('credits'):
                creditsFlag = true;
                break;
            
            case('area'):
                areaFlag = true;
                break;

            case('department'):
                departmentFlag = true;
                break;

            case('groups'):
                groupsFlag = true;
                break;

            default:
                console.log(param);
                tooMuchParametersFlag = true;
        }
    }

    if(tooMuchParametersFlag) {
        res.status(400).send("Too much parameters encountered");
    } else {
        if(codeFlag && nameFlag && descriptionFlag && creditsFlag && areaFlag && departmentFlag && groupsFlag) {
            next();
        } else {
            res.status(400).send("Missing parameters");
        }
    }
}

function partialCheckParameters(req, res, next) {
    //Body must have at least one of these variables in order to modify the subject
    let codeFlag = false;
    let nameFlag = false;
    let descriptionFlag = false;
    let creditsFlag = false;
    let areaFlag = false;
    let departmentFlag = false;
    let groupsFlag = false;
    let tooMuchParametersFlag = false;

    for(let param in req.body) {
        switch(param){
            case('code'):
                codeFlag = true;
                break;
            
            case('name'):
                nameFlag = true;
                break;
            
            case('description'):
                descriptionFlag = true;
                break;

            case('credits'):
                creditsFlag = true;
                break;
            
            case('area'):
                areaFlag = true;
                break;

            case('department'):
                departmentFlag = true;
                break;

            case('groups'):
                groupsFlag = true;
                break;

            default:
                console.log(param);
                tooMuchParametersFlag = true;
        }
    }

    if(tooMuchParametersFlag) {
        res.status(400).send("Too much parameters encountered");
    } else {
        if(codeFlag || nameFlag || descriptionFlag || creditsFlag || areaFlag || departmentFlag || groupsFlag) {
            next();
        } else {
            res.status(400).send("Missing parameters");
        }
    }
}