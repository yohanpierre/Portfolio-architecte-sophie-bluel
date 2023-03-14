const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const checkWork = require('../middlewares/checkWork');
const workCtrl = require('../controllers/works.controller');

router.post('/',  workCtrl.create);
router.get('/', workCtrl.findAll);
router.delete('/:id',  workCtrl.delete);

module.exports = router;
