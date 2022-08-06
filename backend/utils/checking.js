const Specialty = require('../models/specialtyModel');

async function isValidSpecialty(specialty) {
    if (!specialty) return false;
    let savedSpecialty = Specialty.findOne({"name": specialty});
    if (!savedSpecialty) return false;

    return true;
}

function isValidLocation(location) {
    if (!location) return false;
    if (!location.street || !location.city || !location.state || !location.zipcode) return false;
    return true;
}

module.exports = {
    isValidSpecialty,
    isValidLocation
};