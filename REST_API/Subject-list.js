const Subject = require('./Subject.js'); 
const fs = require('fs');

class Subjects {
    constructor() {
        this.path = 'subjects.json';
        this.subjects = JSON.parse(fs.readFileSync(this.path));
    }

    addSubject(newSubject) {
        let codeExist = this.subjects.find(sub => sub.code === newSubject.code);

        if(codeExist) {
            return false;
        }

        this.subjects.push(newSubject);
        fs.writeFileSync(this.path, this.getJSON());
        return true;
    }

    getJSON() {
        return JSON.stringify(this.subjects);
    }

    find(subject) {
        return this.subjects.find(sub => sub.code === subject.code);
    }

    modifySubject(code, subject) {
        //TODO: Implement this function
    }
}

module.exports = Subjects;