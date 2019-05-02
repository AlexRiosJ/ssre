import { Timetable } from '../timetable/Timetable';

// TODO: Define sttudent attributes
export class Student {
    constructor(
        public id: string, //Expediente
        public name: string,
        public lastname: string,
        public currentTimetable: Timetable,
        public timetables: Timetable[],
        public password: string,
        public major: string,
    ) {}
}
