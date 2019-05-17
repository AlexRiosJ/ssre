let { mongoose } = require('./mongodb-connect');

let subjectSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    area: {
        type: String,
        enum: ['CU', 'SP', 'SC', 'PAP', 'ING'],
        required: true
    },
    department: {
        type: String,
        required: true
    },
    groups: [{
        groupCode: {
            type: String,
            unique: true,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        teacher: {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            lastname: {
                type: String,
                required: true
            }
        },
        classInfo: [{
            classRoom: {
                type: String,
                required: true
            },
            day: {
                type: String,
                enum: ['0', '1', '2', '3', '4', '5'],
                required: true
            },
            time: {
                type: String,
                enum: ['7:00', '9:00', '11:00', '13:00', '16:00', '18:00', '20:00'],
                required: true
            },
            language: {
                type: String,
                required: true
            }
        }]
    }]

});

let Subject = mongoose.model('subjects', subjectSchema);
module.exports = { Subject };