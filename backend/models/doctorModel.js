const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    phone: String,
    avatarUrl: String,
    specialty: String,
    description: String,
    degrees: Array,
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
            avatarUrl: String
        },
        time: Date,
        status: { type: String, default: 'BOOKING' } // BOOKING, CONFIRMED, CANCELLED, COMPLETED, MISSED
    }],
    availableSlots: Array
});

module.exports = mongoose.model('Doctor', DoctorSchema);
