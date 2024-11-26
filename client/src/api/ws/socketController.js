import ChatSocket from './sockets/ChatSocket';
import NotificationSocket from './sockets/NotificationSocket';
import EventSocket from './sockets/EventSocket';

export let controller;
export let chatController;
export let eventController;

export const initSocket = store => {
  controller = new NotificationSocket(
    store.dispatch,
    store.getState,
    'notifications'
  );
  chatController = new ChatSocket(store.dispatch, store.getState, 'chat');
  eventController = new EventSocket(store.dispatch, store.getState, 'events')
  return store;
};
