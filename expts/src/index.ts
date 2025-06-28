import express from "express";
import dotenv from "dotenv";
import path from 'path';
import { engine } from 'express-handlebars';
import validateEnv from "./utils/validateEnv";
import logger from "./middlewares/logger";
import router from "./router/router";

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT;

const projectRoot = path.resolve();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine({
    helpers: require(path.join(projectRoot, 'src/views/helpers/helpers.cjs'))
}));
app.set("view engine", "handlebars");
app.set("views", path.join(projectRoot, 'src/views'));

app.use(logger('completo'));
app.use(router);

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});