var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hallo Route yang ke 2');
});

module.exports = router;
