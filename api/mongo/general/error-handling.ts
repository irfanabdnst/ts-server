import { ErrorRequestHandler } from 'express';

export const apiErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    switch (req.app.get('env')) {
        case 'development':
            console.log(err);
            return res.status(err.status).json(err);
        case 'production':
            // production logging
            return res.status(err.status).json(err.publicVersion());
    }
};
