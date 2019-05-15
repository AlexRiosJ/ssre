
import { ClassInformation } from './ClassInformation';
import { Teacher } from './../../../teacher/Teacher';

export class GroupList {
    constructor(
// tslint:disable-next-line: variable-name
        public _id: string,
        public groupCode: string,
        public name: string,
        public teacher: Teacher,
        public classInfo: ClassInformation[] // One object per day
        ) {}
}
