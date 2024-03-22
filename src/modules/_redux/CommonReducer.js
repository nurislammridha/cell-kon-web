import * as Types from "./Types";

const initialState = {
  homeData: null,
  productDetails: null,
  signUpInput: {
    buyerName: "",
    mailOrPhone: "",
    password: "",
    cPassword: ""
  },
  isSignUpLoading: false,
  isSignUpComplete: false,
  loginInput: {
    mailOrPhone: "",
    password: ""
  },
  isLoginLoading: false,
  isLoginComplete: false,
  isCartAdded: false,
  isCartLoading: false,
  cartList: null,
  isQuantityLoading: null,
  addressInput: {
    buyerName: "",
    buyerPhone: "",
    isMetropolitan: true,
    division: "",
    divisionId: "",
    district: "",
    districtId: "",
    upazilla: "",
    upazillaId: "",
    union: "",
    unionId: "",
    nearestArea: "",
    nearestAreaId: "",
    detailsAddress: "",
    postalCode: "",
  },
  isAddressLoading: false,
  buyerDetails: null,
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
    case Types.GET_SIGNUP_INPUT:
      const { name, value } = action.payload
      const signUpInput = { ...state.signUpInput };
      signUpInput[name] = value;
      return {
        ...state,
        signUpInput: signUpInput,
      };
    case Types.SIGNUP_CREATED:
      const signupCreated = initialState.signUpInput;
      return {
        ...state,
        signUpInput: signupCreated,
      };
    case Types.IS_SIGNUP_LOADING:
      return {
        ...state,
        isSignUpLoading: action.payload,
      };
    case Types.IS_SIGNUP_COMPLETE:
      return {
        ...state,
        isSignUpComplete: action.payload,
      };
    case Types.GET_LOGIN_INPUT:
      const { name: name1, value: value1 } = action.payload
      const loginInput = { ...state.loginInput };
      loginInput[name1] = value1;
      return {
        ...state,
        loginInput: loginInput,
      };
    case Types.LOGIN_CREATED:
      const loginCreated = initialState.loginInput;
      return {
        ...state,
        loginInput: loginCreated,
      };
    case Types.IS_LOGIN_LOADING:
      return {
        ...state,
        isLoginLoading: action.payload,
      };
    case Types.IS_LOGIN_COMPLETE:
      return {
        ...state,
        isLoginComplete: action.payload,
      };
    case Types.IS_CART_ADDED:
      return {
        ...state,
        isCartAdded: action.payload,
      };
    case Types.IS_CART_LOADING:
      return {
        ...state,
        isCartLoading: action.payload,
      };
    case Types.CART_LIST:
      return {
        ...state,
        cartList: action.payload,
      };
    case Types.IS_QUANTITY_LOADING:
      return {
        ...state,
        isQuantityLoading: action.payload,
      };
    case Types.IS_ADDRESS_LOADING:
      return {
        ...state,
        isAddressLoading: action.payload,
      };
    case Types.GET_ADDRESS_INPUT:
      const { name: nameA, value: valueA } = action.payload
      const addressInput = { ...state.addressInput };
      addressInput[nameA] = valueA;
      return {
        ...state,
        addressInput: addressInput,
      };
    case Types.ADDRESS_CREATED:
      const addressCreated = initialState.addressInput;
      return {
        ...state,
        addressInput: addressCreated,
      };
    case Types.BUYER_DETAILS:
      return {
        ...state,
        buyerDetails: action.payload,
      };
    default:
      break;
  }
  return newState;
};
export default CommonReducer;
