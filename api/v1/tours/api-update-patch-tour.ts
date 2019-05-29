import { RequestHandler } from 'express';

import { db, pgp } from '../../../db/db';
import { PublicInfo } from '../../../model/shared/messages';

const caseConverter = require('change-case-object');

export const apiUpdatePatchTour: RequestHandler = (req, res, next) => {
    const tourID = req.params.id;
    const data = caseConverter.snakeCase(req.body);
    const sql = `${pgp.helpers.update(data, undefined, 'tours')} where id = '${tourID}'`;
    db.none(sql).then(() => {
        res.status(200).json(new PublicInfo('Tour updated', 200, { updatedTour: data }));
    });
    // next(new APIError('Not Found', 'Tour data not found', 400));
};
