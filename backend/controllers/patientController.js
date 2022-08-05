const Patient = require('../models/patientModel');

async function getAll(req, res) {
    try {
        let patients = await Patient.find({});
        res.json(patients);
    } catch (err) {
        throw new Error(err);
    }
};

async function create(req, res) {
    try {
        let patientInput = req.body;
        console.log(patientInput);
        let patient = new Patient(patientInput);
        let savedPatient = await patient.save();
        res.status(201).json(savedPatient);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    getAll,
    create
}