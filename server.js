// Import necessary packages
const exp = require('express');
const hbs = require('express-handlebars');
const routes = require('./controllers');
const sess = require('express-session');
const sqlz = require('./config/connection');
const SQLStore = require('connect-session-sequelize')(sess.Store);
require('dotenv').config();

// Define the server and port number
const srv = exp();
const port = process.env.PORT || 3001;

// Import necessary models
const { User, Blog, Comment } = require('./models');

// Set up middleware
srv.use(exp.urlencoded({ extended: true }));
srv.use(exp.json());
const sessionConfig = {
    secret: process.env.DB_SESSION_SECRET,
    cookie: {
        maxAge: 0.5 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SQLStore({
        db: sqlz
    })
};
srv.use(sess(sessionConfig));
srv.use(exp.static('public'));
const handlebars = hbs.create({});
srv.engine('handlebars', handlebars.engine);
srv.set('view engine', 'handlebars');
srv.use('/', routes);

// Sync the database and start the server
sqlz.sync({ force: false }).then(function () {
    srv.listen(port, function () {
        console.log('App listening on PORT ' + port);
    });
});