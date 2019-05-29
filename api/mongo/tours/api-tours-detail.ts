import { RequestHandler } from 'express';

import { Tour } from '../db/schema/tour-schema';
import { fileMapper } from '../general/static';
import { MongoTourDetail } from '../model/mongo-tour-detail';

export const apiGetTourDetail: RequestHandler = (req, res, next) => {
    const tourId = req.params.id;
    Tour.findOne({ _id: tourId }).then((selectedTour: any) => {
        const imageURLs = selectedTour.img.map(fileMapper(req.app.get('env')));
        const tourDetail = new MongoTourDetail(selectedTour, imageURLs);
        res.status(200).json(tourDetail);
    });
};
