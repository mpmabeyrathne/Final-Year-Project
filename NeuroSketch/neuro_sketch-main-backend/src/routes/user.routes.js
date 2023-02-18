const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller');

router.post('/user-save', userController.create);
router.get('/user-get-all',  userController.findAll);
router.get('/:email', userController.findById);

module.exports = router
