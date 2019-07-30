require(`dotenv`).config();
const express = require(`express`);
const bodyParser = require(`body-parser`);
const cookieParser = require(`cookie-parser`);
const path = require(`path`);
const app = express();
const port = 5000;

const authRoute = require(`./app/routes/auth.route`);
const userRoute = require(`./app/routes/user.route`);

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

// localhost:5000
app.route(`/`)
    .get((req, res) => {
        res.render(`index`);
    });

// localhost:5000/auth
app.use(`/auth`, authRoute);

// localhost:5000/users
app.use(`/users`, userRoute);

app.listen(port, () => console.log(`App listening on port, ` + port));