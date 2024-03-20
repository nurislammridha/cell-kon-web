import { showToast } from "../../utils/ToastHelper";
import * as Types from "./Types";
import Axios from "axios";

export const GetHomePageData = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}product/home-page`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.HOME_PAGE, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const ProductDetailsById = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}product/${id}`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.PRODUCT_DETAILS, payload: res.data.result });
      }
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const GetSignUpInput = (name, value) => (dispatch) => {
  const formValue = { name, value }
  dispatch({ type: Types.GET_SIGNUP_INPUT, payload: formValue });
};
export const SignUpSubmit = (data) => (dispatch) => {
  const { buyerName, mailOrPhone, password, cPassword } = data
  // console.log('data', data)
  if (buyerName.length === 0) {
    showToast("error", "Full name shouldn't be empty!")
    return 0
  } else if (mailOrPhone.length === 0) {
    showToast("error", "Mail or phone name shouldn't be empty!")
    return 0
  } else if (password.length === 0) {
    showToast("error", "Password shouldn't be empty!")
    return 0
  } else if (password.length < 6) {
    showToast("error", "Password length should be at least 6 character!")
    return 0
  } else if (password !== cPassword) {
    showToast("error", "Password and confirm password are mitch match!")
    return 0
  }
  let buyerEmail = ""
  let buyerPhone = ""
  mailOrPhone.substring(0, 2) === "01" ? buyerPhone = mailOrPhone : buyerEmail = mailOrPhone
  const postData = { buyerName, password, buyerEmail, buyerPhone }

  const url = `${process.env.REACT_APP_API_URL}buyer`;
  dispatch({ type: Types.IS_SIGNUP_LOADING, payload: true })
  try {
    Axios.post(url, postData).then((res) => {
      if (res.data.status) {
        // console.log('res', res)
        dispatch({ type: Types.IS_SIGNUP_LOADING, payload: false });
        dispatch({ type: Types.SIGNUP_CREATED, payload: true });
        showToast("success", res.data.message);
        if (res.data.isSignUp) {
          localStorage.setItem("isLogin", true)
          localStorage.setItem("buyerData", JSON.stringify(res.data.result))
          dispatch({ type: Types.IS_SIGNUP_COMPLETE, payload: true });
        }
      }
    }).catch((err) => {
      showToast("success", err);
    });
  } catch (error) {
    dispatch({ type: Types.IS_SIGNUP_LOADING, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const GetLoginInput = (name, value) => (dispatch) => {
  const formValue = { name, value }
  dispatch({ type: Types.GET_LOGIN_INPUT, payload: formValue });
};
export const LoginSubmit = (data) => (dispatch) => {
  const { mailOrPhone, password } = data
  // console.log('data', data)
  if (mailOrPhone.length === 0) {
    showToast("error", "Mail or phone name shouldn't be empty!")
    return 0
  } else if (password.length === 0) {
    showToast("error", "Password shouldn't be empty!")
    return 0
  } else if (password.length < 6) {
    showToast("error", "Password length should be at least 6 character!")
    return 0
  }
  let buyerEmail = ""
  let buyerPhone = ""
  mailOrPhone.substring(0, 2) === "01" ? buyerPhone = mailOrPhone : buyerEmail = mailOrPhone
  const postData = { password, buyerEmail, buyerPhone }

  const url = `${process.env.REACT_APP_API_URL}buyer/login`;
  dispatch({ type: Types.IS_LOGIN_LOADING, payload: true })
  try {
    Axios.post(url, postData).then((res) => {
      if (res.data.status) {
        // console.log('res', res)
        dispatch({ type: Types.IS_LOGIN_LOADING, payload: false });
        dispatch({ type: Types.LOGIN_CREATED, payload: true });
        showToast("success", res.data.message);
        if (res.data.isLogin) {
          localStorage.setItem("isLogin", true)
          localStorage.setItem("buyerData", JSON.stringify(res.data.result))
          dispatch({ type: Types.IS_LOGIN_COMPLETE, payload: true });
        } else {
          localStorage.setItem("isLogin", false)
          localStorage.setItem("buyerData", null)
        }
      }
    }).catch((err) => {
      showToast("success", err);
    });
  } catch (error) {
    dispatch({ type: Types.IS_LOGIN_LOADING, payload: false });
    showToast("error", "Something went wrong");
  }
};
