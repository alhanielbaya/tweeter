import io from 'socket.io-client';

const initialState = {
  socket: io.connect('')
};

interface action {
  type: any;
  payload: any;
}

export const socketReducer = (state = initialState, action: action) => {
  switch (action.type) {
    default:
      return state;
  }
};
