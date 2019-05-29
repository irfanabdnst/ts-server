import { RequestHandler } from 'express';

import { db } from '../../../db/db';
import * as dbModel from '../../../db/model_generated';
import { tours } from '../../../db/queries/sql';
import { TourFilters } from '../../../model/shared/tour-filters';
import { TourSummary } from '../../../model/shared/tours-summary';

export const apiGetTours: RequestHandler = (req, res, next) => {
    const filters = new TourFilters(req.query);
    db.any(tours.search, { searchCondition: filters.getCondition() }).then(
        (tours: dbModel.tours[]) => {
            const toursResult = tours.map(item => new TourSummary(item));
            res.status(200).json(toursResult);
        }
    );
};
