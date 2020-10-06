import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import { services } from './services';
import { routers } from './routers';

class Server {
    /**
     * @param routers - Router Class (See router folder)
     * @param services - All exported services object, for manual DI (See services folder)
     */
    constructor(routers, services) {
        this.PORT = process.env.PORT || 8080;
        this.express = express();
        this.routers = routers;
        this.services = services;
        this.init();

        // this.express.use(express.static(path.join(__dirname, '../build')))
    }

    init() {
        console.log('Starting MERN stack server...');
        this.initDatabase();
        this.initMiddlewares();
        this.initRouters();
        this.initHandlers();
    }

    initDatabase() {
        console.log('Connecting to database...');
        require('./db/mongoose');
    }

    initMiddlewares() {
        console.log('Starting middlewares...');
        this.express.use(bodyParser.json()); // for parsing application/json
        this.express.use(compression()); // compress all responses
    }

    initRouters() {
        console.log('Starting routers...');
        for (const i in this.routers) {
            /**
             * Pass all services to router for DI
             */
            const Router = this.routers[i];
            const router = new Router(this.services);
            this.express.use(`/${router.prefix}`, router.express);
        }
    }

    initHandlers() {
        this.express.use(this.services.handler.handleData);
        this.services.handler.handleGlobalErrors();
    }

    start() {
        this.express.listen(this.PORT, () => {
            console.log(`App listening to ${this.PORT}....`);
            console.log('Press Ctrl+C to quit.')
        });
    }
}

const server = new Server(routers, services);
server.start();

