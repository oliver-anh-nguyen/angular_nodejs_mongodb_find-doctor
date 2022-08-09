const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const uploader = require('../middlewares/s3fileUploader');

router.get('/:username/appointments', patientController.getAppointments);
router.get('/:username', patientController.getPatientById);
router.patch('/:username', uploader.single('avatar'), patientController.updateInfoPatient);
router.post('/:username/appointments', patientController.bookAppointment);
router.patch('/:username/appointments', patientController.cancelAppointment);

module.exports = router;
