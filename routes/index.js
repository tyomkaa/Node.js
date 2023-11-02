var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');
const LangController = require('../controllers/LangController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main' });
});

router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/changeLang/:lang', LangController.changeLang);

module.exports = router;
