import * as Types from "./Types";

const initialState = {
  homeData: "fsfsf",
};
const CommonReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.HOME_PAGE:
      // console.log('action.payload', action.payload)
      return {
        ...state,
        homeData: action.payload,
      };
    default:
      break;
  }
  console.log('newState', newState)
  return newState;
};
export default CommonReducer;
