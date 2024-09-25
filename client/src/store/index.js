import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { initSocket } from '../api/ws/socketController';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }),
});

initSocket(store);

export default store;
