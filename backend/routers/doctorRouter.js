const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/', doctorController.getAll);
router.get('/search', doctorController.search);
router.get('/:username', doctorController.getByUsername);
router.patch('/:username', doctorController.update);
router.get('/:username/appointments', doctorController.getAllAppointments);
router.patch('/:username/appointments/:patientUsername/:time', doctorController.updateAppointment);

module.exports = router;
