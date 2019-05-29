import { RequestHandler } from "express";
import * as argon from 'argon2';
import { DataStore } from "../../../data/data";

export const apiLocalSignup: RequestHandler = (req,res,next) => {
    argon.hash(req.body.password).then(hash => {
        console.log(hash);
        DataStore.accounts.push({email: req.body.email, password: hash});
        res.send('Account Created');
    })
}