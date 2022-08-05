const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/', patientController.getAll);
router.post('/', patientController.create);

module.exports = router;
