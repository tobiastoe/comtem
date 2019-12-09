import { CustomerHistory } from './customer-history.model';

export class Customer {
    constructor(
        public id: string,
        public name: string,
        public imageUrl: string,
        public emotion: string,
        public lastEmotion: string,
        public emotionHistory: CustomerHistory [],
        public currentShop: string,
    ) {}
}
