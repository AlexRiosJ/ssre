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

    find(code) {
        return this.subjects.find(sub => sub.code == code);
    }

    modifySubject(code, subject) {
        
        let subjectIndex = this.subjects.findIndex(s => s.code == code);

        if(subjectIndex != -1){
            //For each property of the parameter subject, replace it in the original subject

            if(subject.code) {
                if(this.subjects.find(s => s.code == subject.code))
                    return false;

                this.subjects[subjectIndex].code = subject.code;
            }
            if(subject.name) this.subjects[subjectIndex].name = subject.name;
            if(subject.description) this.subjects[subjectIndex].description = subject.description;
            if(subject.credits) this.subjects[subjectIndex].credits = subject.credits;
            if(subject.area) this.subjects[subjectIndex].area = subject.area;
            if(subject.department) this.subjects[subjectIndex].department = subject.department;
            if(subject.groups) this.subjects[subjectIndex].groups = subject.groups;

            fs.writeFileSync(this.path, this.getJSON());

            return true;
        } else {
            return false;
        }
    }
}

module.exports = Subjects;