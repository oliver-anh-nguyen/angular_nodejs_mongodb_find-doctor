const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const StatusCodes = require('../utils/StatusCodes');
const checking = require('../utils/checking');

async function getAll(req, res, next) {
    try {
        let doctors = await Doctor.find({}, { '_id': 0, '__v': 0 });
        res.json(doctors);
    } catch (err) {
        next(err);
    }
};

async function search(req, res, next) {
    try {
        let specialty = req.query.specialty;
        let city = req.query.city;
        let query = {};
        if (!specialty && !city) {
            res.status(StatusCodes.BAD_REQUEST).json({ "error": "There is no specialty or city in the request" });
        }
        if (specialty) {
            query['specialty'] = specialty;
        }
        if (city) {
            query['location.city'] = city;
        }
        console.log(query);
        let doctors = await Doctor.find(query, { '_id': 0, '__v': 0 });
        res.json(doctors);
    } catch (err) {
        next(err);
    }
};

async function getByUsername(req, res, next) {
    try {
        let username = req.params.username;
        let doctor = await Doctor.findOne({ 'username': username }, { '_id': 0, '__v': 0 });
        res.json(doctor);
    } catch (err) {
        next(err);
    }
};

async function update(req, res, next) {
    try {
        let username = req.params.username;
        let body = req.body;
        let fullname = body.fullname;
        let phone = body.phone;
        let avatarurl = body.avatarurl;
        let specialty = body.specialty;
        let description = body.description;
        let degrees = body.degrees;
        let location = body.location;

        let updateNeeded = false;
        let updateUserNeeded = false;
        let updateAppointmentNeeded = false;
        let updateUser = {};
        let updateDoctor = {};
        let updateAppointment = {};

        let updatedDoctor = null;

        if (fullname) {
            if (fullname.trim().length === 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({ "error": "Invalid full name" });
            }
            updateNeeded = true;
            updateUserNeeded = true;
            updateAppointmentNeeded = true;
            updateUser['fullname'] = fullname;
            updateDoctor['fullname'] = fullname;
            updateAppointment['appointment.$[elm].doctor.fullname'] = fullname;
        }
        if (phone) {
            updateNeeded = true;
            updateDoctor['phone'] = phone;
        }
        if (avatarurl) {
            updateNeeded = true;
            updateUserNeeded = true;
            updateUser['avatarurl'] = avatarurl;
            updateDoctor['avatarurl'] = avatarurl;
        }
        if (specialty) {
            if (!(await checking.isValidSpecialty(specialty))) {
                return res.status(StatusCodes.BAD_REQUEST).json({ "error": "Invalid specialty" });
            }
            updateUserNeeded = true;
            updateAppointmentNeeded = true;
            updateUser['specialty'] = specialty;
            updateDoctor['specialty'] = specialty;
            updateAppointment['appointment.$[elm].doctor.specialty'] = specialty;
        }
        if (description) {
            updateNeeded = true;
            updateDoctor['description'] = description;
        }
        if (degrees) {
            updateNeeded = true;
            updateDoctor['degrees'] = degrees;
        }
        if (location) {
            if (!checking.isValidLocation(location)) {
                return res.status(StatusCodes.BAD_REQUEST).json({ "error": "Invalid location" });
            }
            updateAppointmentNeeded = true;
            updateDoctor['location'] = location;
            updateAppointment['appointment.$[elm].location'] = location;
        }
        if (!updateNeeded) {
            return res.status(StatusCodes.BAD_REQUEST({ "error": "No data provided for update" }));
        }
        if (updateUserNeeded) {
            await User.findOneAndUpdate({ username: username }, updateUser);
        }
        if (updateNeeded) {
            updatedDoctor = await Doctor.findOneAndUpdate({ username: username }, updateDoctor);
        }
        if (updateAppointmentNeeded) {
            const filters = { 'arrayFilters': [{ 'elm.doctor.username': username }], 'multi': true }
            await Patient.updateMany({ 'appointment.doctor.username': username }, updateAppointment, filters);
        }

        res.json(updatedDoctor);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    getByUsername,
    search,
    update
}
