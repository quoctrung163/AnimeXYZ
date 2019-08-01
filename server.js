// require module npm
require(`dotenv`).config();
const express = require(`express`);
const bodyParser = require(`body-parser`);
const cookieParser = require(`cookie-parser`);
const path = require(`path`);

const app = express();
const port = 5000;

// require module route
const authRoute = require(`./app/routes/auth.route`);
const userRoute = require(`./app/routes/user.route`);
const homeRoute = require(`./app/routes/home.route`);
const itemRoute = require('./app/routes/item.route');

// require middleware
const authMiddleware = require('./app/middleware/auth.middleware');
const sessionMiddleware = require('./app/middleware/session.middleware');

// using template engine
app.set(`view engine`, `pug`);
app.set(`views`, `./views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// using cookie for save session login user
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

// require module for using static file
app.use(express.static(path.join(__dirname, `public`)));

// route
app.use(`/`, homeRoute);
app.use(`/auth`, authRoute);
app.use(`/users`, userRoute);
app.use('/items', itemRoute);

app.listen(port, () => console.log(`App listening on port, ` + port));