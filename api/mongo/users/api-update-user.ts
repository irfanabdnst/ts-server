import { RequestHandler } from 'express';

export const apiUpdateUser: RequestHandler = (req, res, next) => {
    res.send('Updated user with id: ' + req.params.id);
};
