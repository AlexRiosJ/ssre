
import { ClassInformation } from './ClassInformation';
import { Teacher } from './../../../teacher/Teacher';

export class GroupList {
    constructor(
        public id: string,
        public name: string,
        public teacher: Teacher,
        public classInfo: ClassInformation[] // One object per day
        ) {}
}