const mongoose = require('mongoose');

const SpecialtySchema = new mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Specialty', SpecialtySchema);
