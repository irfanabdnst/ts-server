import jsonReviews from './reviews.json';
import jsonTours from './tours.json';

interface Account {
    email: string;
    password: string
}

export class DataStore {
    static tours = jsonTours;
    static reviews = jsonReviews;
    static accounts: Account[] = [];
}
