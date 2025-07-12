import express from "express";
import dotenv from "dotenv";
import path from 'path';
import { engine } from 'express-handlebars';
import validateEnv from "./utils/validateEnv";
import logger from "./middlewares/logger";
import router from "./router/router";

import session from 'express-session';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid'; 

dotenv.config();
validateEnv(); 

const app = express();
const PORT = process.env.PORT;

const projectRoot = path.resolve();

app.use(express.static(path.join(projectRoot, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use(session({
    genid: () => uuidv4(), 
    secret: process.env.SESSION_SECRET || 'a_fallback_secret_should_be_long_and_random', 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production' 
    }
}));

app.use((req, res, next) => {
    if (req.session && req.session.uid) {
        res.locals.userLoggedIn = true;
        res.locals.userName = req.session.userFullname; 
        res.locals.userId = req.session.uid; 
    } else {
        res.locals.userLoggedIn = false;
        res.locals.userName = null;
        res.locals.userId = null;
    }
    next();
});


app.engine("handlebars", engine({
    helpers: require(path.join(projectRoot, 'src/views/helpers/helpers.cjs')),
    layoutsDir: path.join(projectRoot, 'src/views/layouts'), 
    defaultLayout: 'main', 
    partialsDir: path.join(projectRoot, 'src/views/partials'),
    extname: '.handlebars' 
}));
app.set("view engine", "handlebars");
app.set("views", path.join(projectRoot, 'src/views'));


app.use(logger('completo'));

app.use('/', router);

app.use((req, res) => {
    res.status(404).render('errors/404', { title: 'Página Não Encontrada' });
});


app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});

declare module 'express-session' {
    interface SessionData {
        uid: string; 
        userFullname: string; 
        returnTo?: string;
    }
}