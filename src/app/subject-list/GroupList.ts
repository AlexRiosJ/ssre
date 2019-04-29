import { Subject } from './subject/Subject';
import { Teacher } from '../teacher/Teacher';
import { ClassInformation } from './subject/ClassInformation';

export class GroupList {
    constructor(
        public id: number,
        public teacher: Teacher,
        public classInfo: ClassInformation[] // One object per day
        ) {}
}
