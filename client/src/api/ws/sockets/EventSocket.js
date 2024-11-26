import WebSocket from './WebSocket';
import { eventNotify } from '../../../store/slices/eventsSlice';

class EventSocket extends WebSocket {
  constructor(dispatch, getState, room) {
    super(dispatch, getState, room);
  }

  anotherSubscribes = () => {
    this.onEventElapse();
  };

  onEventElapse = () => {
    this.socket.on('eventElapse', (count) => {
      this.dispatch(eventNotify(count));
    });
  }

  subscribeEvent = id => {
    this.socket.emit('subscribeEvent', id)
  }

  unsubscribeEvent = id => {
    this.socket.emit('unsubscribeEvent', id)
  }
}

export default EventSocket;
