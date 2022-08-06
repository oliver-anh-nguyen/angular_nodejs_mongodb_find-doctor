const jwt = require("jsonwebtoken");
const StatusCodes = require('../utils/StatusCodes');
const userModel = require('../models/userModel');
const doctorModel = require("../models/doctorModel");
const patientModel = require("../models/patientModel");

async function login(req, res) {
    try {
        const {username, password} = req.body;
        const userDb = await userModel.findOne({ username });
        if (!userDb) {
            throw new Error(`LOGIN: username ${username} does not exist!`);
        }
        if (userDb.password === password) {
            const token = jwt.sign( {...userDb}, `SECRET`);
            res.status(StatusCodes.OK).json({token});
        } else {
            throw new Error(`LOGIN: password incorrect!`);
        }
    } catch (err) {
        throw new Error(`LOGIN: ${err}`);
    }
}

async function signup(req, res) {
    try {
        // create new user
        let userInput = req.body;
        let user = new userModel(userInput);
        let newUser = await user.save();

        if (req.body.role === 'PATIENT') {
            // create new patient
            let patientInput = {username: req.body.username, fullname: req.body.fullname, avatarurl: req.body.avatarurl};
            let patient = new patientModel(patientInput);
            let newPatient = await patient.save();
            res.status(StatusCodes.CREATED).json(newPatient);
        } else if (req.body.role === 'DOCTOR') {
            // create new doctor
            let doctorInput = {username: req.body.username, fullname: req.body.fullname, avatarurl: req.body.avatarurl};
            let doctor = new doctorModel(doctorInput);
            let newDoctor = await doctor.save();
            res.status(StatusCodes.CREATED).json(newDoctor);
        } else {
            res.status(StatusCodes.CREATED).json(newUser);
        }
    } catch (err) {
        throw new Error(`SIGNUP: ${err}`);
    }
}

module.exports = {
    login,
    signup
}