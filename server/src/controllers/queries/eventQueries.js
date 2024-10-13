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

        return events;
    } catch(error) {
        console.log(error);
    }
}