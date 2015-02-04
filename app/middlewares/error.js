var logger = require('../utils/logger');

module.exports = function () {
	return function(err, req, res, next) {
		logger.fatal(err);
		res.status(500).send(err.toString());
	};
};
