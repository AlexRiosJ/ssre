import { Timetable } from '../timetable/Timetable';

// TODO: Define sttudent attributes
export class Student {
    constructor(
        public id: number,
        public name: string,
        public lastname: string,
        public timetable: Timetable
    ) {}
}
