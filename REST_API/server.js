'use strict'
const http = require('http');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Subjects = require('Subject-list.js');

const hostname = '127.0.0.1';
const port = 3000;

let app = express();

let jsonParser = bodyParser.json();
let corsOptions = {
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200
}

const subjects = new Subjects();
const users = JSON.parse(fs.readFileSync('users.json'));

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
            let subject = Subjects.find(req.params.code);
            if(subject) {
                res.json(subject);
            } else {
                res.status(400).send("Error. Subject doesn't exist");
            }

        } else {
            res.status(400).send("Error. Code required");
        }
    })
    .patch(verifyToken, (req, res) => {
        //TODO: Use subjects.modifySubject() to implement this ¿
    });

app.route('/api/login')
    .post((req, res) => {
        //TODO: Create the token and send it to the user
    });

app.route('/api/login')
    .post((req, res) => {
        //TODO: Remove the token from the white list
    });


function verifyToken(req, res, next) {
    //TODO: Implement this function with JWT
    next();
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

    for(param in req.body) {
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

            case('group'):
                groupsFlag = true;
                break;

            default:
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