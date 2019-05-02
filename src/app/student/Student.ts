import { Timetable } from '../timetable/Timetable';

// TODO: Define sttudent attributes
export class Student {
    constructor(
        public id: string, //Expediente
        public name: string,
        public lastname: string,
        public timetable: Timetable,
        public password: string,
    ) {}
}
