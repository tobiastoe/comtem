export class Customer {
    constructor(
        public id: string,
        public name: string,
        public imageUrl: string,
        public emotion: string,
        public emotionHistory: string[],
    ) {}
}
