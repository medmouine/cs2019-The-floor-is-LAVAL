import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as errorHandler from 'errorhandler';
import * as express from 'express';
import * as expressStatusMonitor from 'express-status-monitor';
import * as helmet from 'helmet';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as methodOverride from 'method-override';
import * as morgan from 'morgan';
import * as path from 'path';
import { logger } from './logger';
import * as dotenv from 'dotenv';
import './interfaces/http/accounts/AccountController'
import binding from "./binding";

if (isDev()) dotenv.config();

export class Server {
    public static bootstrap (): Server {
        return new Server();
    }
    public app: express.Application;
    public Ready: Promise<any>;

    private container: Container;

    constructor () {
        this.Ready = new Promise(async (resolve, reject) => {
            this.container = new Container();
            binding(this.container);
            const inversifyApp: InversifyExpressServer = new InversifyExpressServer(this.container,
              null,
              { rootPath: "/api"} );

            inversifyApp.setConfig((app) => {
                return this.config(app);
            });
            this.app = inversifyApp.build();
            resolve(this);
        });
    }

    public config (app: express.Application): void {
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(morgan('tiny', {
            stream: {
                write: (message: string) => logger.info(message.trim()),
            },
        }));

        app.use(bodyParser.urlencoded({
            extended: true,
        }));
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(helmet());
        app.use(cors());
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_END_ORIGIN);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, authorization');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });
        app.use(compression());
        app.use(methodOverride());
        app.use(expressStatusMonitor());
        if (isDev()) {
            app.use(express.static(path.resolve(__dirname, '../frontend')));
            app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname, '../frontend/index.html')));
        }
        else {
            app.use(express.static('frontend'));
            app.get('/*', (req, res) => res.sendFile('index.html'));
        }
        // catch 404 and forward to error handler
        app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });

        // error handling
        app.use(errorHandler());
    }
}

function isDev() {
    return process.env.NODE_ENV === 'development';
}


Server.bootstrap().Ready.then((serv) => {
    if (isDev()) {
        console.log('Starting server in dev mode.');
    } else {
        console.log('Starting server in prod mode.');
    }
    const app = serv.app;
    const server = app.listen(process.env.PORT || 8080);
    logger.info(`listening on port ${process.env.PORT || 8080}`);
});
