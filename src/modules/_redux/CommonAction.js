import { showToast } from "../../utils/ToastHelper";
import * as Types from "./Types";
import Axios from "axios";

export const GetHomePageData = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}product/home-page`;
  dispatch({ type: Types.HOME_PAGE, payload: "res.data.result" });
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

export const GetHomePageData1 = async () => {
  const url = `${process.env.REACT_APP_API_URL}product/home-page`;
  // dispatch({ type: Types.HOME_PAGE, payload: "res.data.result" });
  let x = ""
  try {
    await Axios.get(url).then((res) => {
      // console.log('res', res)
      if (res.data.status) {
        x = res.data.result
        x = "sfrgerg"
      }
      console.log('x out if', x)
    });
    console.log('x out axios', x)
  } catch (error) {
    showToast("error", "Something went wrong");
  }
  console.log('x', x)
  return x
};

