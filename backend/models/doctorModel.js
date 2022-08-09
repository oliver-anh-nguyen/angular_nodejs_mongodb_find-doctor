const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    phone: String,
    avatarurl: String,
    specialty: String,
    description: String,
    degrees: String,
    location: {
        street: String,
        city: String,
        state: String,
        zipcode: String
    },
    appointment: [{
        patient: {
            username: String,
            fullname: String,
            phone: String,
            avatarurl: String
        },
        time: Date,
        status: { type: String, default: 'BOOKING' } // BOOKING, CONFIRMED, CANCELLED, COMPLETED, MISSED
    }]
});

module.exports = mongoose.model('Doctor', DoctorSchema);
