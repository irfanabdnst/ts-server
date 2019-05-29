import { RequestHandler } from 'express';

import { TourFilters } from '../../../model/shared/tour-filters';
import { Tour } from '../db/schema/tour-schema';
import { MongoTourSummary } from '../model/mongo-tours-summary';

export const apiGetTours: RequestHandler = (req, res, next) => {
    const filters = new TourFilters(req.query);
    Tour.find(filters.asObject()).then(data => {
        const toursResult = data.map((item: any) => new MongoTourSummary(item));
        res.status(200).json(toursResult);
    });
};
