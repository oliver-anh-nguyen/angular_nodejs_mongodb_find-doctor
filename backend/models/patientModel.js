const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    phone: String,
    avatarUrl: String,
    appointment: [{
        doctor: String,
        specialty: String,
        location: {
            street: String,
            city: String,
            state: String,
            zipcode: String
        },
        time: Date,
        status: { type: String, default: 'BOOKED'}
    }]
});

module.exports = mongoose.model('Patient', PatientSchema);
