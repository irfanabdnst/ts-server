import { RequestHandler } from "express";
import * as argon from 'argon2';
import { DataStore } from "../../../data/data";

export const apiLocalSignin: RequestHandler = (req,res,next) => {
    const account = DataStore.accounts.find(acc => {
        return acc.email == req.body.email
    });
    if(account) {
        argon.verify(account.password, req.body.password).then(match =>{
            if(match) {
                res.send('User logged in')
            } else {
                res.send('Login Failed')
            }
        })
    }   
    else {
        res.send('Login Failed')
    }
}