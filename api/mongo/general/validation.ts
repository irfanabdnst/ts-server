import { RequestHandler } from 'express';

import { APIError } from '../../../model/shared/messages';

export const apiValidation: RequestHandler = (req, res, next) => {
    if (req.accepts('application/json')) {
        next();
    } else {
        next(
            new APIError(
                'Content Type not supported',
                'This API only support application/json',
                400
            )
        );
    }
};
