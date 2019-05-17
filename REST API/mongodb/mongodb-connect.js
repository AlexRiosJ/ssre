'use strict'
let mongoose = require('mongoose');

let mongoDB = '';

if(process.env.MONGODB_URL) {
    mongoDB = process.env.MONGODB_URL;
    mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(() => console.log('Connection succcessful to mongo ssreDB!')).catch(err => console.log(err));
    
    let db = mongoose.connection;
    
    module.exports = { mongoose };
}