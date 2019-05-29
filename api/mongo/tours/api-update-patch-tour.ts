import { RequestHandler } from 'express';

import { PublicInfo } from '../../../model/shared/messages';
import { Tour } from '../db/schema/tour-schema';

export const apiUpdatePatchTour: RequestHandler = (req, res, next) => {
    const tourID = req.params.id;
    Tour.updateOne({ _id: tourID }, req.body).then(updatedTour => {
        res.status(200).json(new PublicInfo('Tour updated', 200, { updatedTour: updatedTour }));
    });
    // next(new APIError('Not Found', 'Tour data not found', 400));
};
