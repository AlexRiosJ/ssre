import { GroupList } from './group-list/GroupList';

// TODO define subject attributes
export class Subject {
    constructor(
// tslint:disable-next-line: variable-name
        public _id: string,
        public code: string,
        public name: string,
        public description: string,
        public credits: number,
        public area: string,
        public department: string,
        public groups: GroupList[],
// tslint:disable-next-line: variable-name
        public __v: number
    ) {}
}
