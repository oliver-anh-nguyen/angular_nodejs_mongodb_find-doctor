const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    phone: String,
    avatarUrl: String,
    appointment: [{
        doctor: {
            username: String,
            fullname: String,
            avatarUrl: String,
            specialty: String
        },
        location: {
            street: String,
            city: String,
            state: String,
            zipcode: String
        },
        time: Date,
        status: { type: String, default: 'BOOKING'} // BOOKING, CONFIRMED, CANCELLED, COMPLETED, MISSED
    }]
});

module.exports = mongoose.model('Patient', PatientSchema);
