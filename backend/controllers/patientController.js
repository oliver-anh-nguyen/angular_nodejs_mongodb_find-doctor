const patientModel = require('../models/patientModel');
const doctorModel = require('../models/doctorModel');
const StatusCodes = require('../utils/StatusCodes');

async function getPatientById(req, res) {
    try {
        let patient = await patientModel.find({'username': req.params.username});
        res.status(StatusCodes.OK).json(patient);
    } catch (err) {
        throw new Error(err);
    }
};

async function bookAppointment(req, res) {
    try {
        const {username} = req.params;
        const {doctorUsername, time} = req.body;

        // update appointment to patient
        let doctor = await doctorModel.findOne({'username': doctorUsername});
        let newAppointment = {
            location: doctor.location,
            doctor: {
                username: doctor.username,
                fullname: doctor.fullname,
                avatarurl: doctor.avatarurl,
                specialty: doctor.specialty
            },
            time: time,
            status: 'BOOKING'
        };
        await patientModel.updateOne({
            'username': username,
        }, {
            $push: {
                'appointment': newAppointment
            }
        });

        // update appointment to doctor
        let patient = await patientModel.findOne({'username': username});
        let newAppointmentDoctor = {
            patient: {
                username: patient.username,
                fullname: patient.fullname,
                phone: patient.phone,
                avatarurl: patient.avatarurl
            },
            time: time,
            status: 'BOOKING'
        }
        await doctorModel.updateOne({
            'username': doctorUsername,
        }, {
            $push: {
                'appointment': newAppointmentDoctor
            }
        });

        // remove time appointment
        await doctorModel.updateOne({
            'username': doctorUsername,
        }, {
            $pull: {
                'availableSlots': time
            }
        });
        res.status(StatusCodes.OK).json(`PATIENT: add appointment successfully!`);
    } catch (err) {
        throw new Error(err);
    }
}

async function cancelAppointment(req, res) {
    try {
        const {username} = req.params;
        const {doctorUsername, time} = req.body;
        await patientModel.updateOne({
            'username': username,
            'appointment.doctor.username': doctorUsername,
            'appointment.time': time
        }, {
            $set: {'appointment.$.status': 'CANCELLED'}
        });
        await doctorModel.updateOne({
            'username': doctorUsername,
            'appointment.patient.username': username,
            'appointment.time': time
        }, {
            $set: {'appointment.$.status': 'CANCELLED'}
        });
        res.status(StatusCodes.OK).json(`PATIENT: cancel appointment successfully!`);
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    getPatientById,
    bookAppointment,
    cancelAppointment
}