import * as Types from "./Types";

const initialState = {
  homeData: null,
  productDetails: null,
};
const CommonReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.HOME_PAGE:
      return {
        ...state,
        homeData: action.payload,
      };
    case Types.PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload,
      };
    default:
      break;
  }
  return newState;
};
export default CommonReducer;
