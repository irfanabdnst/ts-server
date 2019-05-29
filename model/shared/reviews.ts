import { reviews } from '../../db/model_generated';

export class Review {
    id: string;
    tourID: string;
    reviewTitle: string;
    reviewLongText: string | null;
    stars: number;

    constructor(data: reviews) {
        this.id = data.id;
        this.tourID = data.tour_id;
        this.reviewTitle = data.review_title;
        this.reviewLongText = data.review_long_text;
        this.stars = data.stars;
    }
}
