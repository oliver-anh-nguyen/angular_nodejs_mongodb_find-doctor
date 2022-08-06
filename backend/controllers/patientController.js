const Patient = require('../models/patientModel');
const StatusCodes = require('../utils/StatusCodes');

async function getAll(req, res) {
    try {
        let patients = await Patient.find({});
        res.status(StatusCodes.OK).json(patients);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    getAll
}