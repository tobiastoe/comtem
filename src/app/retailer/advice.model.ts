export class Advice {
    constructor(
        public key: string,
        public oldEmotion: string,
        public newEmotion: string,
        public description: string,
        public customerRating ?: number,
        public retailerRating ?: number[],
    ) {}
}
