const router = require('express').Router();

const apiRoutes = require('./api');
//const homeRoutes = require('./home-routes.js');

//router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;

// home routes included but commented out until that file is built