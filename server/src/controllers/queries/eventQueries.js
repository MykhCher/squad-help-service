const { Events } = require('../../models');

module.exports.createEvent = async (data) => {
    try {
        const event = await Events.create(data);
        return event.get({ plain: true });
    } catch (error) {
        console.log(error);
    }
};

module.exports.getEvents = async (id) => {
    try {
        const events = await Events.findAll({
            where: {
                userId: id,
                elapsed: false
            }
        });

        const output = events.filter(event => {
            return (new Date(event.eventTime).getTime() - Date.now() > 0);
        });

        return output;
    } catch(error) {
        console.log(error);
    }
}

module.exports.deleteEvent = async (id) => {
    try {
        const deletedRows = await Events.destroy({where: {id}});
        return deletedRows;
    } catch(error) {
        console.log(error);
    }
}

module.exports.setElapsedEvent = async id => {
    try {
        const event = await Events.findByPk(id);
        event.elapsed = true;
        event.save();
        return event;
    } catch(error) {
        console.log(error);
    }
}