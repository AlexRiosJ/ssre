let {
    mongoose
} = require('./mongodb-connect');
const jwt = require('jsonwebtoken');

let studentSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    currentTimetable: {
        name: {
            type: String,

        },
        subjects: [{
            groupCode: {
                type: String,

            },
            name: {
                type: String,

            },
            teacher: {
                id: {
                    type: Number,

                },
                name: {
                    type: String,

                },
                lastname: {
                    type: String,

                }
            },
            classInfo: [{
                classRoom: {
                    type: String,

                },
                day: {
                    type: String,
                    enum: ['0', '1', '2', '3', '4', '5'],

                },
                time: {
                    type: String,
                    enum: ['7:00', '9:00', '11:00', '13:00', '16:00', '18:00', '20:00'],

                },
                language: {
                    type: String,

                }
            }]
        }]
    },
    timetables: [{
        name: {
            type: String,

        },
        subjects: [{
            groupCode: {
                type: String,

            },
            name: {
                type: String,

            },
            teacher: {
                id: {
                    type: Number,

                },
                name: {
                    type: String,

                },
                lastname: {
                    type: String,

                }
            },
            classInfo: [{
                classRoom: {
                    type: String,

                },
                day: {
                    type: String,
                    enum: ['0', '1', '2', '3', '4', '5'],

                },
                time: {
                    type: String,
                    enum: ['7:00', '9:00', '11:00', '13:00', '16:00', '18:00', '20:00'],

                },
                language: {
                    type: String,

                }
            }]
        }]
    }],
    password: {
        type: String,
        required: true
    },
    major: {
        type: String,
        enum: ['ISC', 'ISI', 'IE', 'IES'],
        required: true
    },
    token: {
        type: String,
        required: true
    },
    access: {
        type: String,
        enum: ['student', 'admin'],
        required: true
    }
});

let secret = process.env.SECRET;

studentSchema.methods.generateToken = function () {
    let user = this;
    let token = jwt.sign({
            _id: user._id.toHexString(),
            access: user.access
        },
        secret, {
            expiresIn: '1h'
        }).toString();
    return token;
}

studentSchema.statics.verifyToken = function (token) {
    let studentToken = jwt.decode(token);
    return new Promise((resolve, reject) => {
        Student.findById(studentToken._id).then((student) => {
            if (token === student.token) {
                jwt.verify(token, secret, (err, decoded) => {
                    if (err) {
                        if (err.name === 'TokenExpiredError')
                            return reject({
                                error: err.name
                            });
                        return reject({
                            error: 'error verifying token'
                        })
                    } else {
                        return resolve(decoded);
                    }
                });
            } else {
                return reject({
                    error: token + ' ' + student.token + ' ' + studentToken._id
                });
            }
        });
    });
}

studentSchema.statics.getTokenData = function (token) {
    return jwt.decode(token);
}

let Student = mongoose.model('students', studentSchema);

module.exports = {
    Student
};