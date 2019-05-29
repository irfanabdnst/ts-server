export class MongoTourSummary {
    id: string;
    location: string;
    tourTitle: string;
    price: number;

    constructor(data: any) {
        this.id = data.id;
        this.location = data.location;
        this.tourTitle = data.tourTitle;
        this.price = data.price;
    }
}
