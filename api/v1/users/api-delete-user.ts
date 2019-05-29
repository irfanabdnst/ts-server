import { RequestHandler } from 'express';

export const apiDeleteUser: RequestHandler = (req, res, next) => {
    res.send('Deleted user with id: ' + req.params.id);
};
