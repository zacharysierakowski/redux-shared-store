export const INCREASE = "example-component/count/INCREASE";
export const DECREASE = "example-component/count/DECREASE";

export const increase = () => dispatch => {
  dispatch({
    type: INCREASE
  });
};

export const decrease = () => dispatch => {
  dispatch({
    type: DECREASE
  });
};
