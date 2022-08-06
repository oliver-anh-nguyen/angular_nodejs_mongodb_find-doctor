const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/:username/appointment', patientController.getAppointments);
router.get('/:username', patientController.getPatientById);
router.patch('/:username/update', patientController.updateInfoPatient);
router.post('/:username/appointment', patientController.bookAppointment);
router.patch('/:username/appointment', patientController.cancelAppointment);

module.exports = router;
