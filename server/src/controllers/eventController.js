const { createEvent, getEvents } = require('./queries/eventQueries');
const ServerError = require('../errors/ServerError');

module.exports.createEvent = (req, res, next) => {
    const { body, tokenData: {userId} } = req
    body.userId = userId;
    body.elapsed = false;

    createEvent(body)
        .then(event => {
            res.status(201).json(event);
        })
        .catch(err => next(new ServerError(err.message)));
}

module.exports.getAllEvents = (req, res, next) => {
    const { tokenData: {userId} } = req;

    getEvents(userId)
        .then(events => {
            if (!events[0]) return res.status(200).send([null]);
            res.status(200).json(events);
        })
        .catch(err => next(new ServerError(err.message)));
}