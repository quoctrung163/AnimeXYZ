require(`dotenv`).config();
const express = require(`express`);
const bodyParser = require(`body-parser`);
const cookieParser = require(`cookie-parser`);
const path = require(`path`);
const db = require(`./db`);
const multer = require('multer');
const app = express();
const port = 5000;

const authRoute = require(`./app/routes/auth.route`);
const userRoute = require(`./app/routes/user.route`);
const homeRoute = require(`./app/routes/home.route`);
const testRoute = require(`./app/routes/test.route`);

const sessionMiddleware = require(`./app/middleware/session.middleware`);

app.set(`view engine`, `pug`);
app.set(`views`, `./views`);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

// using cookie-parser
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static(path.join(__dirname, `public`)));

// route
app.use(`/`, homeRoute);
app.use(`/auth`, authRoute);
app.use(`/users`, userRoute);
app.use(`/test`, testRoute);

app.listen(port, () => console.log(`App listening on port, ` + port));