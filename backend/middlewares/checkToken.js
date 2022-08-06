const jwt = require("jsonwebtoken");
const StatusCodes = require('../utils/StatusCodes');

module.exports = function checkToken(req, res, next) {
    try {
        if (!req.headers['authorization']) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ auth: false, message: 'No authorization provided!' });
        }

        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ auth: false, message: 'No token provided!' });
        }

        jwt.verify(token, `SECRET`, function (err, decoded) {
            if (err) {
                return res.status(StatusCodes.INTERNAL_ERROR).json({ auth: false, message: 'Failed to authenticate token!' })
            }
            req.user = decoded;
            next();
        });
    } catch (err) {
        next(err);
    }
}