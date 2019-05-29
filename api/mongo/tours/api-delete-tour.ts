import { RequestHandler } from 'express';

import { db } from '../../../db/db';
import { PublicInfo } from '../../../model/shared/messages';
import { Tour } from '../db/schema/tour-schema';

export const apiDeleteTour: RequestHandler = (req, res, next) => {
    const tourID = req.params.id;
    Tour.deleteOne({ _id: tourID }).then(deleted => {
        res.json(PublicInfo.infoDeleted(deleted));
    });
};
