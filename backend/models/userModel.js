const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, default: 'PATIENT' }, // Doctor, Patient, Admin
    fullname: String,
    avatarUrl: String // Aws S3 url
});

module.exports = mongoose.model('User', UserSchema);
