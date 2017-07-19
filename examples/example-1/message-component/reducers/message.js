const initialState = {
  value: "Message from separate components' default reducer state"
};

const message = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default message;
