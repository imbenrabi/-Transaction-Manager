import express from 'express';
import { Transaction } from '../models/transaction'
import { handleMongoResp } from "../services/mongoResp.service";
import { auth } from '../services/auth.service';

export class TransactionsRouter {

    constructor(services) {
        this.prefix = 'transactions';
        this.services = services;
        this.express = express.Router();
        this.init();
    }

    init() {
        console.log('Starting transactions router...');
        this.express.route('/').get(auth, async (req, res, next) => {
            try {
                const match = { owner: req.user._id };
                req.user.transactions = await Transaction.find(match);
                const response = await handleMongoResp(req.user.transactions);
                return next(response);
            } catch (e) {
                let content = this.services.parsing.parseError(e);
                return next(content);
            }
        });
        this.express.route('/transaction').post(auth, async (req, res, next) => {
            try {
                console.log('here');
                let transaction = new Transaction({
                    ...req.body,
                    owner: req.user._id
                })
                transaction = await transaction.save();
                console.log(transaction);
                return next(handleMongoResp(transaction));
            } catch (e) {
                let content = this.services.parsing.parseError(e);
                return next(content);
            }
        });
        this.express.route('/:id').delete(auth, async (req, res, next) => {
            try {
                const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

                if (!task) {
                    res.status(404)
                    throw new Error('Transaction not found')
                }

                return next(handleMongoResp(transaction));
            } catch (e) {
                let content = this.services.parsing.parseError(e);
                return next(content);
            }
        });

    }

}