import express from 'express';
import { User } from '../models/user'
import { handleMongoResp } from "../services/mongoResp.service";

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
        this.express.route('/user').post(async (req, res, next) => {
            try {
                let user = new User(req.body);
                user = await user.save()
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