const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/', doctorController.getAll);
router.get('/search', doctorController.search);
router.get('/:username', doctorController.getByUsername);
router.patch('/:username', doctorController.update);

module.exports = router;
