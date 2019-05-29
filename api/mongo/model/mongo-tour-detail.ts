import { MongoTourSummary } from './mongo-tours-summary';
import { MongoReview } from './mongo-reviews';

export class MongoTourDetail extends MongoTourSummary {
    tourCategory: string;
    tourDescription: string;
    price: number;
    currency: number;
    img: string[];
    reviews: MongoReview[];

    constructor(tourData: any, tourImages: string[]) {
        super(tourData);
        this.tourCategory = tourData.tourCategory;
        this.tourDescription = tourData.tourDescription;
        this.price = tourData.price;
        this.currency = tourData.currency;
        this.img = tourImages;
        this.reviews = tourData.reviews.map((item: any) => new MongoReview(item));
    }
}
