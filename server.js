const express = require(`express`);
const path = require(`path`);

const app = express();

const port = 5000;

app.set(`view engine`, `pug`);
app.set(`views`, `./views`);

app.use(express.static(path.join(__dirname, `public`)));

// localhost:3000
app.route(`/`)
    .get((req, res) => {
        res.render(`index`);
    });


app.listen(port, () => `App listening on port, ` + port);