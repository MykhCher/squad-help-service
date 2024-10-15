const query = require('./queries/eventQueries');
const ServerError = require('../errors/ServerError');

module.exports.createEvent = (req, res, next) => {
    const { body, tokenData: {userId} } = req
    body.userId = userId;
    body.elapsed = false;

    query.createEvent(body)
        .then(event => {
            res.status(201).json(event);
        })
        .catch(err => next(new ServerError(err.message)));
}

module.exports.getAllEvents = (req, res, next) => {
    const { tokenData: {userId} } = req;

    query.getEvents(userId)
        .then(events => {
            if (!events[0]) return res.status(200).send([]);
            res.status(200).json(events);
        })
        .catch(err => next(new ServerError(err.message)));
}

module.exports.deleteEvent = (req, res, next) => {
    const { tokenData: { userId }, params: { id } } = req;

    query.checkEventOwner(id, userId)
        .then(isOwner => {
            isOwner 
                ? query.deleteEvent(id).then(count => res.status(202).send(`deleted ${count} event.`))
                : res.send('You can\'t delete event that you don\'t own.');
        })
        .catch(err => next(new ServerError(err.message)));
}

module.exports.setElapsedEvent = (req, res, next) => {
    
    const { tokenData: { userId }, params: { id } } = req;

    query.checkEventOwner(id, userId)
        .then(isOwner => {
            isOwner 
                ? query.setElapsedEvent(id).then(event => res.status(202).json(event))
                : res.send('You can\'t change event that you don\'t own.');
        })
        .catch(err => next(new ServerError(err.message)));
}

module.exports.getNotifications = (req, res, next) => {

    const { tokenData: { userId } } = req;

    query.notifyEvents(userId)
        .then(notifies => res.status(200).json(notifies))
        .catch(err => next(new ServerError(err.message)));

}