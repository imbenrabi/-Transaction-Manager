import express from 'express';
import { handleMongoResp } from "../services/mongoResp.service";
import { auth } from '../services/auth.service';
const User = require('../models/user')

export class UsersRouter {
    constructor(services) {
        this.prefix = 'users';
        this.services = services;
        this.express = express.Router();
        this.init();
    }

    init() {
        console.log('Starting users router...');
        this.express.route('/').get(async (req, res, next) => {
            try {
                const users = await User.find({});
                const response = await handleMongoResp(users);
                return next(response);
            } catch (e) {
                let content = this.services.parsing.parseError(e);
                return next(content);
            }
        });

        this.express.route('/login').post(async (req, res, next) => {
            try {
                console.log('Attemting to log in...');
                let user = await User.findByCredentials(req.body.email, req.body.password);
                if (!user) {
                    console.log('No user found, creating a new account...');
                    console.log(req.body);
                    user = new User(req.body);
                    user = await user.save()
                    const token = await user.generateAuthToken();
                    const response = { ...user._doc, token };
                    return next(handleMongoResp(response));
                }

                console.log('User found! Retrieving token.');
                const token = await user.generateAuthToken();
                const response = { ...user._doc, token }
                return next(handleMongoResp(response));
            } catch (e) {
                let content = this.services.parsing.parseError(e);
                return next(content);
            }
        });

        this.express.route('/logout').post(auth, async (req, res, next) => {
            try {
                req.user.tokens = req.user.tokens.filter((token) => {
                    return token.token !== req.token;
                })
                const user = await req.user.save();
                return next(handleMongoResp(user));
            } catch (e) {
                let content = this.services.parsing.parseError(e);
                return next(content);
            }
        });

        this.express.route('/users').delete(async (req, res, next) => {
            try {
                console.log('deleting...');
                res.send('deleted')
            } catch (e) {
                let content = this.services.parsing.parseError(e);
                return next(content);
            }
        });
    }
}