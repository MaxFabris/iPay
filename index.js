var logger = require('./app/utils/logger'),
    config = require('./app/config/env'),
    app = require('./app/app'),
    db = require('./app/utils/db');

db.on('error', function (err) {
    logger.fatal(err);
});

db.once('open', function () {
    logger.info('DB listening at', config.db.host);

    app.listen(config.express.port, function () {
      logger.info('App listening on port', config.express.port);
    });
});   

