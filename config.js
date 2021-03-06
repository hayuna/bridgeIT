import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import schedule from "node-cron"
import nodemailer from "nodemailer"

let transporter; //nodemailer
const NOTIFICATION_INTERVAL = 1; // duration of the interval between notifications in hours
const ADMIN_EMAILS = [
    "email@ejemplo.es",
    "email@example.com"
];

import { roleNotifier } from "./server/jobs";

const setHeaders = res => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
};

const useMongo = () => {
    let mongo_url
    switch(process.env.NODE_ENV) {
        case 'test':
            mongo_url = process.env.MONGO_URL_TEST;
            break;
        case 'production':
            mongo_url = process.env.MONGO_URL_PROD;
            break;
        case 'development':
            mongo_url = process.env.MONGO_URL_DEV;
            break;
        default:
            mongo_url = process.env.MONGO_URL_DEV;
    }
    mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
};

const useMiddleware = app => {
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
};

const initNodeMailer = () => {

    const { MAIL_SERVICE, MAIL_EMAIL, MAIL_PASSWORD, MAIL_HOST } = process.env;


    if(!((MAIL_EMAIL && MAIL_PASSWORD) && (MAIL_HOST || MAIL_SERVICE)))
        return false;

    transporter = nodemailer.createTransport({
        [MAIL_HOST ? "host" : "service"]: MAIL_HOST || MAIL_SERVICE,
        auth: {
            user: MAIL_EMAIL,
            pass: MAIL_PASSWORD
        }
    })
};

const kickstartScheduler = () => {
    schedule.schedule(`0 */${NOTIFICATION_INTERVAL} * * *`, () => roleNotifier(transporter, ADMIN_EMAILS));
};

export default { setHeaders, useMongo, useMiddleware, initNodeMailer, kickstartScheduler };