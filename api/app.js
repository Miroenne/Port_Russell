const express       = require('express');
var path            = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const cors          = require('cors');

const indexRouter   = require('./routes/index');
const usersRouter = require('./routes/users');
const catwaysRouter = require('./routes/catways');
const mongodb       = require('./db/mongo');

mongodb.initClientDbConnection();

const app = express();

// CORS: on accepte uniquement le front local (localhost / 127.0.0.1),
// ce qui évite qu'un autre domaine puisse appeler l'API depuis un navigateur.
app.use(cors({
    exposedHeaders: ["Authorization"],
    origin : (origin, callback) => {
        const localRegex = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/;

        if(!origin || localRegex.test(origin)){
            return callback(null, true);
        }

        return callback(new Error('Origin non authorisée par CORS'));
    },
    credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catways', catwaysRouter);

// Fallback API: conserve un format JSON homogène même pour les routes inconnues.
app.use(function(req, res, next){
    res.status(404).json({name: 'API_portrussell', version: '1.0.0', status: 404, message: 'not_found'});
});

module.exports = app;
