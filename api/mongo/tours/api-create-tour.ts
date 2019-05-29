import { RequestHandler } from 'express';

import { db, pgp } from '../../../db/db';
import { APIError, PublicInfo } from '../../../model/shared/messages';
import { Tour } from '../db/schema/tour-schema';

export const apiCreateTour: RequestHandler = (req, res, next) => {
    const requiredFields = ['tourTitle', 'location'];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(APIError.errMissingBody());
    }
    const newTour = {
        location: req.body.location || null,
        tourTitle: req.body.tourTitle || null,
        tourCategory: req.body.tourCategory || null,
        tourDescription: req.body.tourDescription || null,
        price: req.body.price || null,
        currency: req.body.currency || null
    };
    new Tour(newTour).save().then(() => {
        res.status(201).json(PublicInfo.infoCreated({ newTour: newTour }));
    });
};
