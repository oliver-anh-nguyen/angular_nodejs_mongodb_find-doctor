const express = require('express');
const router = express.Router();

const specialtyController = require('../controllers/specialtyController');

router.get('/', specialtyController.getAll);
router.get('/:specialtyId', specialtyController.getById);
router.post('/', specialtyController.create);
router.patch('/:specialtyId', specialtyController.updateById);
router.delete('/:specialtyId', specialtyController.deleteById);

module.exports = router;
