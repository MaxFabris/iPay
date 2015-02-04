var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    config = require('./config/env'),
    domainMiddleware = require('express-domain-middleware'),
    jwtMiddleware = require('express-jwt'),
    loggerMiddleware = require('./middlewares/logger'),
    errorMiddleware = require('./middlewares/error'),
    api = require('./routes/api'),
    user = require('./routes/user');

app.use(domainMiddleware);
app.use(loggerMiddleware());
app.use(bodyParser.json());
app.use(errorMiddleware());
app.use('/auth', user);
app.use('/api', jwtMiddleware({secret: config.auth.secret}), api);
module.exports = app;
    
