import { RequestHandler } from 'express';

import { db } from '../../../db/db';
import { tours } from '../../../db/queries/sql';
import { APIError } from '../../../model/shared/messages';
import { TourDetail } from '../../../model/shared/tour-detail';
import { fileMapper } from '../general/static';
import * as dbModel from '../../../db/model_generated';

export const apiGetTourDetail: RequestHandler = (req, res, next) => {
    const tourID = req.params.id;
    db.one<dbModel.tours>(tours.getDetail, { id: tourID })
        .then(selectedTour => {
            let imageURLs: string[];
            if (!selectedTour.img) {
                imageURLs = [];
            } else {
                imageURLs = selectedTour.img.map(fileMapper(req.app.get('env')));
            }

            db.any<dbModel.reviews>(tours.getAllReviews, { tourID: tourID }).then(
                selectedReviews => {
                    const tourDetail = new TourDetail(selectedTour, selectedReviews, imageURLs);
                    res.status(200).json(tourDetail);
                }
            );
        })
        .catch(err => {
            console.log(err);
            next(APIError.errNotFound());
        });
};
