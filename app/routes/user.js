var express = require('express'),
    router = express.Router(),
    AuthCtrl = require('../controllers/auth');

router.post('/login', AuthCtrl.login);
router.post('/register', AuthCtrl.register);

module.exports = router;

