const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const httpError = require('http-errors');
const CORSMiddleware = require('cors');
const checkAuthMiddleware = require('./app/Http/Middleware/check-auth');
const NewsRoutes = require('./routes/NewsRoutes');
const usertRoutes = require('./routes/userRoutes');

const app = express();

app.use(CORSMiddleware());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// routes
app.use('/news', checkAuthMiddleware, NewsRoutes);
app.use('/users', usertRoutes);

app.use((req, res, next) => {
    // catch 404 and forward to error handler
    next(httpError(404, 'No Found'));
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500);
    return res.json({
        error: err
    });
});

module.exports = app