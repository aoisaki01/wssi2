const express = require('express');
const router = express.Router();
const controller = require('../controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hallo world ExpressJS');
});

router.get('/all', controller.getUsers);
router.post('/register', controller.register);
router.put('/update/:id', controller.updateUser);
router.delete('/delete/:id', controller.deleteUser);
router.post('/login', controller.login);

module.exports = router;