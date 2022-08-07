const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    phone: String,
    avatarurl: String,
    appointment: [{
        doctor: {
            username: String,
            fullname: String,
            avatarurl: String,
            specialty: String,
            phone: String
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
