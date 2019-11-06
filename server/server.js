const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

require('./models/User');

require('./config/passport');

const app = express();
const port = process.env.PORT || 5000;

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure Mongoose
mongoose.connect('mongodb://admin:Qwerty1!@ds243518.mlab.com:43518/automated-testing-system-database', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('debug', true);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(require('./routes'));

app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));