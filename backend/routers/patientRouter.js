const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const uploader = require('../middlewares/s3fileUploader');

router.get('/:username/appointments', patientController.getAppointments);
router.get('/:username', patientController.getPatientById);
router.patch('/:username/update', uploader.single('avatar'), patientController.updateInfoPatient);
router.post('/:username/appointment', patientController.bookAppointment);
router.patch('/:username/appointment', patientController.cancelAppointment);

module.exports = router;
