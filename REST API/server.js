const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
let {
    Subject
} = require('./mongodb/Subject');
let {
    Student
} = require('./mongodb/Student');
const port = process.env.PORT || 3000;
const NUMBER_OF_ITERATIONS = 10;

let app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => console.log('Connection in port ' + port));

app.route('/api/subjects')
    .get((req, res) => {
        Subject.find({}, (err, docs) => {
            if (err) {
                res.status(404).send();
                return;
            }
            res.status(200).json(docs);
        });
    })
    .post(authenticate, (req, res) => {
        if (req.studentAccess === 'admin') {
            let newSubject = new Subject(req.body);
            newSubject.save((err, doc) => {
                if (err) {
                    res.status(400).send();
                    return;
                }
                if (doc) {
                    res.status(201).json(doc);
                } else {
                    res.status(400).send({
                        error: 'could not save'
                    });
                }
            });
        } else {
            res.status(401).send();
        }
    });

app.route('/api/subjects/:code')
    .get((req, res) => {
        if (req.params.code) {
            Subject.findOne({
                code: req.params.code
            }, {}, (err, docs) => {
                if (docs) {
                    res.json(docs);
                    return;
                }
                res.status(404).send(err);
            });
        }
    })
    .patch(authenticate, (req, res) => {
        if (req.studentAccess === 'admin') {
            Subject.findOne({
                code: req.params.code
            }).then(() => {
                Subject.updateOne({
                    code: req.params.code
                }, req.body).then(() => {
                    res.status(202).send();
                    return;
                }).catch((err) => {
                    res.status(400).send({
                        error: 'bad request'
                    });
                });
            }).catch((err) => res.status(404).send({
                error: 'not found'
            }));
        } else {
            res.status(401).send();
        }
    });

app.route('/api/user')
    .get((req, res) => {
        Student.find({}, {}, (err, docs) => {
            if (err) {
                res.status(404).send(err);
                return;
            }
            res.json(docs);
        });
    })
    .post((req, res) => {
         if (req.body.id && req.body.name && req.body.lastname && req.body.password && req.body.major) {

            bcrypt.hash(req.body.password, NUMBER_OF_ITERATIONS).then((encrypted) => {
                req.body.password = encrypted;
            }).then(() => {
                let newStudent = new Student(req.body);
                newStudent.save((err, doc) => {
                    if (err) {
                        res.status(400).send(err);
                        return;
                    }
                    if (doc) {
                        res.status(201).json(doc);
                    } else {
                        res.status(400).send({
                            error: 'could not save'
                        });
                    }
                });
            }).catch((err) => console.log(err));
        } else {
            res.status(400).send({
                error: 'bad request'
            });
        }
    });

app.route('/api/user/:id')
    .get(authenticate, (req, res) => {
        Student.findOne({
            id: req.params.id
        }, (err, docs) => {
            if (err) {
                res.status(404).send({
                    error: 'not found'
                });
                return;
            }
            res.status(200).json(docs);
        });
    })
    .patch(authenticate, (req, res) => {
        if (req.body.password) {
            bcrypt.hash(req.body.password, NUMBER_OF_ITERATIONS).then((encrypted) => {
                req.body.password = encrypted;
            }).then(() => {
                Student.updateOne({
                    id: req.params.id
                }, req.body).then(() => {
                    res.status(202).send();
                    return;
                }).catch((err) => {
                    res.status(400).send({
                        error: 'bad request'
                    });
                });
            });
        } else {
            Student.findOne({
                id: req.params.id
            }).then(() => {
                Student.updateOne({
                    id: req.params.id
                }, req.body).then(() => {
                    res.status(202).send();
                    return;
                }).catch((err) => {
                    res.status(400).send({
                        error: 'bad request'
                    });
                });
            }).catch((err) => res.status(404).send({
                error: 'not found'
            }));
        }
    });

app.route('/api/login')
    .post((req, res) => {
        let id = req.body.id;
        let password = req.body.password;

        Student.findOne({
            id: id
        }).then((student) => {
            bcrypt.compare(password, student.password, (err, isCorrect) => {
                if (isCorrect) {
                    let token = student.generateToken();
                    student.token;
                    Student.updateOne({
                        id: id
                    }, {
                        $set: {
                            token: token
                        }
                    }).then(() => {
                        res.set('x-auth', token);
                        res.status(200).send({
                            message: 'success',
                            token
                        });
                        return;
                    }).catch((err) => {
                        res.status(400).send(err);
                    });
                } else {
                    res.status(403).send(err);
                }
            });
        }).catch((err) => {
            res.status(400).send(err);
        });
    });

app.route('/api/logout')
    .post(authenticate, (req, res) => {
        let token = req.header('x-auth');
        let studentData = Student.getTokenData(token);
        Student.updateOne({
            _id: studentData._id
        }, {
            token: ''
        }).then(() => {
            res.status(200).send();
        }).catch((err) => {
            res.status(404).send(err);
        });
    });

function authenticate(req, res, next) {
    let token = req.get('x-auth');
    if (!token) {
        res.status(401).send({
            error: 'no token'
        });
        return;
    }

    Student.verifyToken(token).then((student) => {
        req.studentId = student._id;
        req.studentAccess = student.access;
        next();
    }).catch((err) => {
        res.status(401).send(err);
    });
}