export class MongoReview {
    id: string;
    tourID: string;
    reviewTitle: string;
    reviewLongText: string;
    stars: number;

    constructor(data: any) {
        this.id = data.id;
        this.tourID = data.tourID;
        this.reviewTitle = data.reviewTitle;
        this.reviewLongText = data.reviewLongText;
        this.stars = data.stars;
    }
}
