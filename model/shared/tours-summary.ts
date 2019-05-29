import * as dbModel from '../../db/model_generated';

export class TourSummary {
  id: string;
  location: string;
  tour_title: string;
  price: number;

  constructor(data: dbModel.tours) {
    this.id = data.id;
    this.tour_title = data.tour_title;
    this.location = data.location;
    this.price = data.price;
  }
}
