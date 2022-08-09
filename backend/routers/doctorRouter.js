const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const uploader = require('../middlewares/s3fileUploader');

router.get('/', doctorController.getAll);
router.get('/search', doctorController.search);
router.get('/:username', doctorController.getByUsername);
router.patch('/:username', uploader.single('avatar'), doctorController.update);
router.get('/:username/appointments', doctorController.getAllAppointments);
router.patch('/:username/appointments', doctorController.updateAppointment);

module.exports = router;
