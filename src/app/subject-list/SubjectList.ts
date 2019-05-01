import { Subject } from './subject/Subject';
import { Teacher } from '../teacher/Teacher';
import { ClassInformation } from './subject/ClassInformation';

export class SubjectList {
    constructor(
        public id: number,
        public subject: Subject,
        public teacher: Teacher,
        public classInfo: ClassInformation[] // One object per day
        ) {}
}
