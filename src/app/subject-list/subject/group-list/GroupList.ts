import { Teacher } from 'src/app/teacher/Teacher';
import { ClassInformation } from './ClassInformation';

export class GroupList {
    constructor(
        public id: number,
        public name: string,
        public teacher: Teacher,
        public classInfo: ClassInformation[] // One object per day
        ) {}
}
