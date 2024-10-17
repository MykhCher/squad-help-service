const Message = require('../models/mongoModels/Message');
const ServerError = require('../errors/ServerError');

module.exports.findWord = (req, res, next) => {
    Message.countDocuments({ body: {$regex: 'паровоз'} })
        .then(count => res.status(200).json({count}))
        .catch(err => next(ServerError(err.message)));
}