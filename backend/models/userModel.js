const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, default: 'PATIENT' }, // DOCTOR, PATIENT, ADMIN
    fullname: String,
    avatarurl: String // AWS S3 URL
});

module.exports = mongoose.model('User', UserSchema);
