import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0
};

const reducers = {
  eventNotify: (state, { payload }) => {
    state.count = payload
  },
  removeEvent: (state) => {
    state.count -= 1;
  } 
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers,
})

const { actions, reducer } = eventSlice;

export const { eventNotify, removeEvent } = actions;

export default reducer;
