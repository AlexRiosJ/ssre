import { SubjectList } from '../subject-list/SubjectList';

export class Timetable {
    constructor(
        public name: string,
        public subjects: SubjectList[]
    ) { }
}