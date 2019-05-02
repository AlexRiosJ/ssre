// TODO define subject attributes
export class Subject {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public credits: number,
        public area: string,
        public department: string,
        public groups: GroupList[]
    ) {}
}
