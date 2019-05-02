import { GroupList } from '../subject-list/subject/group-list/GroupList';

export class Timetable {
    constructor(
        public name: string,
        public subjects: GroupList[]
    ) { }
}