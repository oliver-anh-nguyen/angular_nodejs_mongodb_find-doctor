const jwt = require("jsonwebtoken");
const StatusCodes = require('../utils/StatusCodes');
const userModel = require('../models/userModel');
const doctorModel = require("../models/doctorModel");
const patientModel = require("../models/patientModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const SECRET = process.env.SECRET;

async function login(req, res, next) {
    try {
        const { username, password } = req.body;
        const userDb = await userModel.findOne({ username });
        if (!userDb) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ 'error': `Username ${username} does not exist!` });
        }
        bcrypt.compare(password, userDb.password, function(err, isMatch) {
            // if isMatch == true, password matched
            // else wrong password
            if (isMatch) {
                let infoUser = {
                    username: userDb.username,
                    role: userDb.role,
                    fullname: userDb.fullname,
                    avatarurl: userDb.avatarurl
                };
                console.log(infoUser);
                const token = jwt.sign(infoUser, SECRET, { expiresIn: '1h' });
                res.status(StatusCodes.OK).json({ token });
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).json({ 'error': `Password incorrect!` });
            }
        });
    } catch (err) {
        next(`LOGIN: ${err}`);
    }
}

async function signup(req, res, next) {
    try {
        // create new user
        const {username, role} = req.body;
        const userDb = await userModel.findOne({ username });
        if (userDb) {
            res.status(StatusCodes.UNAUTHORIZED).json({'error': `Username ${username} existed! Try another one!`});
            return
        }
        if (role !== 'PATIENT' && role !== 'DOCTOR') {
            res.status(StatusCodes.UNAUTHORIZED).json({'error': `Wrong Role!`});
            return
        }
        let userInput = req.body;
        await bcrypt.hash(userInput.password, saltRounds, (err, hash) => {
            console.log(hash);
            userInput.password = hash;
            let user = new userModel(userInput);
            user.save();
        });

        if (req.body.role === 'PATIENT') {
            // create new patient
            let patientInput = { username: req.body.username, fullname: req.body.fullname, avatarurl: req.body.avatarurl };
            let patient = new patientModel(patientInput);
            let newPatient = await patient.save();
            res.status(StatusCodes.CREATED).json(newPatient);
        } else if (req.body.role === 'DOCTOR') {
            // create new doctor
            let doctorInput = { username: req.body.username, fullname: req.body.fullname, avatarurl: req.body.avatarurl };
            let doctor = new doctorModel(doctorInput);
            let newDoctor = await doctor.save();
            res.status(StatusCodes.CREATED).json(newDoctor);
        } else {
            res.status(StatusCodes.CREATED).json(newUser);
        }
    } catch (err) {
        console.log(`SIGNUP: ${err}`)
        next(`Something went wrong! Try again later!`);
    }
}

module.exports = {
    login,
    signup
}
