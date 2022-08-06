const Specialty = require('../models/specialtyModel');
const StatusCodes = require('../utils/StatusCodes');

async function getAll(req, res, next) {
    try {
        let specialties = await Specialty.find({}, { "__v": 0 });
        res.json(specialties);
    } catch (err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        let sid = req.params.specialtyId;
        let specialty = await Specialty.findOne({ _id: sid }, { "__v": 0 });
        res.json(specialty);
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next) {
    try {
        let body = req.body;
        if (!body.name) {
            return res.status(StatusCodes.BAD_REQUEST).json({ 'error': 'name does not exist' });
        }
        let specialty = new Specialty();
        specialty.name = body.name;
        specialty.description = body.description;
        let savedSpecialty = await specialty.save();
        res.status(StatusCodes.CREATED).json(savedSpecialty);
    } catch (err) {
        next(err);
    }
}

async function updateById(req, res, next) {
    try {
        let sid = req.params.specialtyId;
        let body = req.body;
        if (!body.name && !body.description) {
            return res.status(StatusCodes.BAD_REQUEST).json({ 'error': 'name and description do not exist' });
        }
        let update = {};
        if (body.name) {
            update['name'] = body.name;
        }
        if (body.description) {
            update['description'] = body.description;
        }
        let prevSpecialty = await Specialty.findByIdAndUpdate({ '_id': sid }, { $set: update });
        res.json(prevSpecialty);
    } catch (err) {
        next(err);
    }
}

async function deleteById(req, res, next) {
    try {
        let sid = req.params.specialtyId;
        let deletedSpecialty = await Specialty.findOneAndDelete({ "_id": sid });
        res.json(deletedSpecialty);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}