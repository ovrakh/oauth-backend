const bodyParser = require('body-parser');
const router = require('express').Router();

router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: false }));

router.use(require('./friends'));
router.use(require('./user'));

router.use((req, res, next) => res.send({ success: true, data: req.dataOut }));
router.use((error, req, res, next) => res.status(error.code).send({ success: false, message: error.message }));

module.exports = router;