import { RequestParamHandler } from 'express';
import { APIError } from '../../../../model/shared/messages';

const dateFormat = new RegExp('(\\d{4})-(\\d{1,2})-(\\d{1,2})');

export const dateParam: RequestParamHandler = (req, res, next, value, name) => {
    const parsedComponent = dateFormat.exec(value);
    if (parsedComponent) {
        const [_, year, month, day] = parsedComponent.map((item: any) => parseInt(item));
        const date = new Date(year, month - 1, day);
        req.params[name] = date;
        next();
    } else {
        next(new APIError('Parse Error', 'Date could not be parsed. Date Format: YYYY-MM-DD', 400));
    }
};
