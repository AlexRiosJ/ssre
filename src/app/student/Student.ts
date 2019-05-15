import { Timetable } from '../timetable/Timetable';

// TODO: Define sttudent attributes
export class Student {
    constructor(
// tslint:disable-next-line: variable-name
        public _id: string,
        public id: string, // Expediente
        public name: string,
        public lastname: string,
        public currentTimetable: Timetable,
        public timetables: Timetable[],
        public password: string,
        public major: string,
        public access: string,
        public token: string,
// tslint:disable-next-line: variable-name
        public __v: number
    ) {}
}
