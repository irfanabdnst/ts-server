import { TourSummary } from './tours-summary';
import { Review } from './reviews';
import { tours, reviews } from '../../db/model_generated';

export class TourDetail extends TourSummary {
    tourCategory: string;
    tourDescription: string | null;
    price: number;
    currency: string;
    img: string[];
    reviews: Review[];

    constructor(tourData: tours, reviewData: reviews[], tourImages: string[]) {
        super(tourData);
        this.tourCategory = tourData.tour_category;
        this.tourDescription = tourData.tour_description;
        this.price = tourData.price;
        this.currency = tourData.currency;
        this.img = tourImages;
        this.reviews = reviewData.map(item => new Review(item));
    }
}
