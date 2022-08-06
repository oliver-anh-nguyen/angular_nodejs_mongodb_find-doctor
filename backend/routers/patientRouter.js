const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/:username', patientController.getPatientById);
router.post('/:username/appointment', patientController.bookAppointment);
router.patch('/:username/appointment', patientController.cancelAppointment);

module.exports = router;
