const WebSocket = require('./WebSocket');
const { Events } = require('../../models');
const { Op } = require('sequelize');
// const CONSTANTS = require('../../constants.js');

class TimerNotificationController extends WebSocket {
  connect(namespace, io) {
    super.connect(namespace, io);
    this.startTimerCheck();
  }

  anotherSubscribes(socket) {
    this.onSubscribeEvent(socket);
    this.onUnsubscribeEvent(socket);
  }

  startTimerCheck() {
    setInterval(async () => {
      const now = new Date();

      const readyEvents = await Events.count({
        where: {
          eventTime: { [Op.lte]: now },
          elapsed: false,
        },
        group: ['userId'],
        raw: true,
      });

      readyEvents.forEach(({ userId, count }) => {
        this.io.to(userId).emit('eventElapse', count);
      });
    }, 15 * 1000);
  }

  onSubscribeEvent (socket) {
    socket.on('subscribeEvent', async (id) => {
      socket.join(id);

      const readyEvents = await Events.count({
        where: {
          eventTime: { [Op.lte]: new Date() },
          elapsed: false,
          userId: id,
        },
      });

      this.io.to(id).emit('eventElapse', readyEvents);
    });
  }

  onUnsubscribeEvent (socket) {
    socket.on('unsubscribeEvent', (id) => {
      socket.join(id);
    });
  }

}

module.exports = TimerNotificationController;
