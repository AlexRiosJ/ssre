'use strict'
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Subjects = require('./Subject-list.js');
const bcrypt = require('bcrypt');

const hostname = '127.0.0.1';
const port = 3000; // Change for Heroku

//TODO: Change the secret key
const secretkey = 'Bueb-ito';
const numberOfIterations = 10;

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
    .post(verifyAdminToken, checkSubjectParameters, (req, res) => {
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
    .patch(verifyAdminToken, partialCheckSubjectParameters, (req, res) => {
        let code = req.params.code;
        if(subjects.modifySubject(code, req.body)) {
            res.status(200).json(req.body);
        } else {
            res.status(400).send("Subject not found or code already exists");
        }
    });

app.route('/api/login')
    .post((req, res) => {
        const id = req.body.id;
        const password = req.body.password;

        if(id && password) {
            let user = users.find(u => u.id == id);

            if(user) {
                bcrypt.compare(password, user.password, numberOfIterations, (err, isCorrect) => {
                    if(isCorrect) {
                        //TODO: Cipher the password
                        jwt.sign({'id': user.id}, secretkey, (err, token) => {
                            tokensWhiteList.push(token);
                            
                            res.header('auth', token)
                                .status(200)
                                .send();
                        })
                    } else {
                        res.status(403).send();
                    }
                })
            } else {
                res.status(400).send("User doesn't found");
            }
        } else {
            res.status(400).send("User not found");
        }
    });

app.route('/api/logout')
    .post(verifyAdminToken, (req, res) => {
        const token = req.header('auth');
        const tokenIndex = tokensWhiteList.findIndex(t => t == token);

        if(tokenIndex != -1) {
            //Delete the current token from the white list
            tokensWhiteList.splice(tokenIndex, 1);

            res.status(200).send();
        } else {
            req.status(400).send("Error ocurred");
        }
    });

//TODO: Post for new user 
//TODO: Edit patch in order to modify user and delete a schedule
app.route('/api/user')
    .post(checkUserParams, (req, res) => {
        //TODO: Check if the users already exists in the DB ✔
        let user = req.body;
        let userExist = users.find(u => u.id == user.id);
        
        if(!userExist) {
            //TODO: Apply hash to the password ✔
            bcrypt.hash(user.password, numberOfIterations, (err, hash) => {
                if(!err) {
                    user.password = hash;
                    users.push(user);
                    res.status(200).send();
                } else {
                    res.status(400).send();
                }
            });
        } else {
            status(400).send('User already exists');
        }
    });

app.route('/api/user/:id')
    .get(verifyUserToken, (req, res) => {
        const token = req.header('auth');
        const data = jwt.decode(token);

        let user = users.find(u => u.id == data.id);

        if(user) {
            if(data.id == req.params.id)
                res.json(user);

            else 
                res.status(403).send();
        } else {
            res.status(403).send();
        }
    })
    .patch(verifyUserToken, checkScheduleParams, (req, res) => {
        const token = req.header('auth');
        const data = jwt.decode(token);
        const id = req.params.id;

        if(id && id == data.id) {
            let user = users.find(u => u.id == data.id);
            let schedule = req.body;
            
            if(user) {
                user.timetables.push(schedule);
                fs.writeFileSync('users.json', JSON.stringify(users));
                res.status(200).send();
            } else {
                res.status(400).send();
            }
        } else {
            res.status(403).send();
        }
    });


app.listen(port, () => console.log(`Conection on port ${port}!`));


function verifyUserToken(req, res, next) {
    const token = req.header('auth');

    if(token && tokensWhiteList.find(t => t == token)) {
        jwt.verify(token, secretkey, (err, authData) => {
            next();
        })
    } else {
        //If the header doesn't have the paremeter 'auth' or if the token isn't in the white list, then, 
        //return an error
        res.status(403).send();
    }
}

function verifyAdminToken(req, res, next) {
    const token = req.header('auth');

    if(token && tokensWhiteList.find(t => t == token)) {
        jwt.verify(token, secretkey, (err, authData) => {
            if(authData.username == 'admin')
                next();
            else
                res.status(403).send();
        })
    } else {
        //If the header doesn't have the paremeter 'auth' or if the token isn't in the white list, then, 
        //return an error
        res.status(403).send();
    }
}

function checkUserParams(req, res, next) {
    let idFlag = false;
    let nameFlag = false;
    let lastNameFlag = false;
    let majorFlag = false;
    let passwordFlag = false;
    let tooManyParametersFlag = false;

    for(let param in req.body) {
        switch(param) {
            case('id'):
                idFlag = true;
                break;

            case('name'):
                nameFlag = true;
                break;

            case('lastname'):
                lastNameFlag = true;
                break;

            case('major'):
                majorFlag = true;
                break;

            case('password'):
                passwordFlag = true;

            default:
                tooManyParametersFlag = true;
        }
    }

    if(!tooManyParametersFlag) {
        if(idFlag && nameFlag && lastNameFlag && majorFlag && passwordFlag) {
            next();
        } else {
            res.status(400).send("Missing parameters");
        }
    } else {
        res.status(400).send("Missing parameters");
    }
}

function checkSubjectParameters(req, res, next) {
    //Body must have only these variables in order to add the subject
    let codeFlag = false;
    let nameFlag = false;
    let descriptionFlag = false;
    let creditsFlag = false;
    let areaFlag = false;
    let departmentFlag = false;
    let groupsFlag = false;
    let tooManyParametersFlag = false;

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
                tooManyParametersFlag = true;
        }
    }

    if(tooManyParametersFlag) {
        res.status(400).send("Too many parameters encountered");
    } else {
        //If all of these variables are in body, then, execute the next function
        if(codeFlag && nameFlag && descriptionFlag && creditsFlag && areaFlag && departmentFlag && groupsFlag) {
            next();
        } else {
            res.status(400).send("Missing parameters");
        }
    }
}

function partialCheckSubjectParameters(req, res, next) {
    //Body must have at least one of these variables in order to modify the subject
    let codeFlag = false;
    let nameFlag = false;
    let descriptionFlag = false;
    let creditsFlag = false;
    let areaFlag = false;
    let departmentFlag = false;
    let groupsFlag = false;
    let tooManyParametersFlag = false;

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
                tooManyParametersFlag = true;
        }
    }

    if(tooManyParametersFlag) {
        res.status(400).send("Too many parameters encountered");
    } else {
        //If one or more of the variables are in the body, then, go to the next function
        if(codeFlag || nameFlag || descriptionFlag || creditsFlag || areaFlag || departmentFlag || groupsFlag) {
            next();
        } else {
            res.status(400).send("Missing parameters");
        }
    }
}

function checkScheduleParams(req, res, next) {
    let nameFlag = false;
    let subjectsFlag = false;
    let tooManyParams = false;

    for(let param in req.body) {
        switch(param){
            case('name'):
                nameFlag = true;
                break;

            case('subjects'):
                subjectsFlag = true;
                break;

            default:
                tooManyParams = true;
                break;
        }
    }

    if(!tooManyParams) {
        if(nameFlag && subjectsFlag) {
            next();
        } else {
            res.status(400).send("Missing parameters");
        }
    } else {
        res.status(400).send("Too many parameters encountered");
    }
}