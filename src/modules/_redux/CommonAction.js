import { getSubTotal } from "../../assets/function/globalFunction";
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
//all filter products list
export const GetAllProduct = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}product`;
  dispatch({ type: Types.IS_PRODUCT_LOADING, payload: true });
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.IS_PRODUCT_LOADING, payload: false });
        dispatch({ type: Types.PRODUCT_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    dispatch({ type: Types.IS_PRODUCT_LOADING, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const GetFilterProduct = (data) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}product/filter`;
  dispatch({ type: Types.IS_PRODUCT_LOADING, payload: true });
  try {
    Axios.post(url, data).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.IS_PRODUCT_LOADING, payload: false });
        dispatch({ type: Types.PRODUCT_LIST, payload: res.data.result });
      }
    });
  } catch (error) {
    dispatch({ type: Types.IS_PRODUCT_LOADING, payload: false });
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
          dispatch(GetCartListByBuyer(res.data.result._id))
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
export const GetCartListByBuyer = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}cart/buyer/${id}`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.IS_CART_LIST_CALLED, payload: true })
        dispatch({ type: Types.CART_LIST, payload: res.data.result })
        localStorage.setItem("cartList", JSON.stringify(res.data.result))
      }
    }).catch((err) => {
      showToast("error", err);
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const FalseCartCalled = () => (dispatch) => {
  dispatch({ type: Types.IS_CART_LIST_CALLED, payload: false });
}
export const AddToCart = (data) => (dispatch) => {
  const { buyerId, productId, quantity, colorName, colorHexCode, sizeName, fullImg } = data
  const postData = {
    buyerId, buyerInfo: buyerId, productInfo: [{ productDetails: productId, productId, quantity, colorName, colorHexCode, sizeName, productImgUrl: fullImg }]
  }
  const url = `${process.env.REACT_APP_API_URL}cart`;
  dispatch({ type: Types.IS_CART_LOADING, payload: true })
  try {
    Axios.post(url, postData).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.IS_CART_LOADING, payload: false })
        dispatch({ type: Types.IS_CART_ADDED, payload: true })
        dispatch(GetCartListByBuyer(buyerId))
      }
    }).catch((err) => {
      showToast("success", err);
    });
  } catch (error) {
    dispatch({ type: Types.IS_CART_LOADING, payload: false });
    showToast("error", "Something went wrong");
  }
};
export const FalseCartAdded = () => (dispatch) => {
  dispatch({ type: Types.IS_CART_ADDED, payload: false })
}
export const CartProductQuantity = (number, productInfoId, cartId, buyerId) => (dispatch) => {
  const postData = { number, productInfoId, cartId }
  const url = `${process.env.REACT_APP_API_URL}cart/quantity`;
  dispatch({ type: Types.IS_QUANTITY_LOADING, payload: true })
  try {
    Axios.post(url, postData).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.IS_QUANTITY_LOADING, payload: false })
        dispatch(GetCartListByBuyer(buyerId))
      }
    }).catch((err) => {
      showToast("success", err);
    });
  } catch (error) {
    dispatch({ type: Types.IS_QUANTITY_LOADING, payload: false });
    showToast("error", "Something went wrong");
  }
};

export const GetAddressInput = (name, value) => (dispatch) => {
  const postData = { name, value }
  dispatch({ type: Types.GET_ADDRESS_INPUT, payload: postData });
}
export const SubmitBuyerAddress = (data) => (dispatch) => {
  const { buyerName, buyerPhone, isMetropolitan, division, divisionId, district, districtId, upazilla, upazillaId, union, unionId, nearestArea, nearestAreaId, detailsAddress, postalCode } = data
  let buyerId = JSON.parse(localStorage.getItem("buyerData"))._id
  if (!buyerId) {
    showToast("error", "Please Login!")
    return 0
  } else if (buyerName.length === 0) {
    showToast("error", "Full name should n't be empty!")
    return 0
  } else if (buyerPhone.length === 0) {
    showToast("error", "Buyer phone should n't be empty!")
    return 0
  } else if (division.length === 0) {
    showToast("error", "Please select a division!")
    return 0
  } else if (district.length === 0) {
    showToast("error", "Please select a district!")
    return 0
  } else if (upazilla.length === 0) {
    showToast("error", "Please select a upazilla!")
    return 0
  } else if (!isMetropolitan && union.length === 0) {
    showToast("error", "Please select a union!")
    return 0
  } else if (nearestArea.length === 0) {
    showToast("error", "Nearest area should n't be empty!")
    return 0
  } else if (detailsAddress.length === 0) {
    showToast("error", "house/holding, plot, road/para, block/Avenue should n't be empty!")
    return 0
  }

  dispatch({ type: Types.IS_ADDRESS_LOADING, payload: true });
  const url = `${process.env.REACT_APP_API_URL}buyer/delivery-address`;
  const postData = {
    buyerId,
    addressInfo: { buyerName, buyerPhone, division, district, upazilla, nearestArea, union, postalCode, detailsAddress, isMetropolitan }
  }
  try {
    Axios.post(url, postData).then((res) => {
      dispatch({ type: Types.IS_ADDRESS_LOADING, payload: false })
      if (res.data.status) {

        dispatch({ type: Types.ADDRESS_CREATED, payload: false })
        showToast("success", res.data.message)
      } else {
        showToast("error", res.data.message)
      }
    }).catch((err) => {
      showToast("success", err);
    });
  } catch (error) {
    dispatch({ type: Types.IS_ADDRESS_LOADING, payload: false });
    showToast("error", "Something went wrong");
  }
}
const makeProductList = (list) => {
  let arr = []
  if (list.length > 0) {
    // console.log('list', list)
    list.forEach(item => {
      const obj = {
        products: item.productId,
        productId: item.productId,
        quantity: item.quantity,
        colorHexCodesize: item.colorHexCode,
        sellPrice: Math.floor(item?.productDetails?.mrp - item?.productDetails?.mrp * item?.productDetails?.regularDiscount * 0.01),
        pastRp: item?.productDetails?.rp,
        colorName: item.colorName,
        sizeName: item.sizeName
      }
      arr.push(obj)
    });
  }
  return arr
}
export const DeleteFromCart = (productInfo) => (dispatch) => {
  const cartList = JSON.parse(localStorage.getItem("cartList"))
  const { _id: cartId, buyerId } = cartList
  const productsArrId = productInfo.map((item) => item['_id'])
  const postData = { cartId, productsArrId }
  // console.log('postData', postData)
  // return 0
  const url = `${process.env.REACT_APP_API_URL}cart/delete-many`;
  try {
    Axios.post(url, postData).then((res) => {
      if (res.data.status) {
        dispatch(GetCartListByBuyer(buyerId))
        dispatch({ type: Types.IS_REMOVE_FROM_CART, payload: true })
      }
    }).catch((err) => {
      showToast("success", err);
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const FalseRemoveFromCart = () => (dispatch) => {
  dispatch({ type: Types.IS_REMOVE_FROM_CART, payload: false })
}
export const SubmitOrder = (list, address) => (dispatch) => {
  const date = new Date()
  const buyerData = JSON.parse(localStorage.getItem("buyerData"))
  const { buyerName, _id: buyerId } = buyerData
  delete address._id
  const subTotal = getSubTotal(list)
  const shippingFee = address?.upazilla === "Dhaka" ? 50 : 100
  const postData = {
    buyerName, buyerId, buyerInfo: buyerId, productInfo: makeProductList(list), orderStatus: "Created",
    deliveryAddressInfo: address, isCreated: true, createdAt: date, paymentMethodName: "COD", subTotal, shippingFee
  }
  // console.log('postdata', subTotal, shippingFee)
  // return 0
  const url = `${process.env.REACT_APP_API_URL}order`;
  dispatch({ type: Types.IS_ORDER_LOADING, payload: true })
  try {
    Axios.post(url, postData).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.IS_ORDER_LOADING, payload: false })
        dispatch({ type: Types.IS_ORDER_CREATED, payload: true })
        dispatch(DeleteFromCart(list))
      }
    }).catch((err) => {
      dispatch({ type: Types.IS_ORDER_CREATED, payload: false })
      dispatch({ type: Types.IS_ORDER_LOADING, payload: false })
      showToast("error", err);
    });
  } catch (error) {
    dispatch({ type: Types.IS_ORDER_LOADING, payload: false })
    showToast("error", "Something went wrong");
  }
};
export const FalseOrderCreated = () => (dispatch) => {
  dispatch({ type: Types.IS_ORDER_CREATED, payload: false })
}
export const GetBuyerDetailsByBuyerId = () => (dispatch) => {
  const buyerId = JSON.parse(localStorage.getItem("buyerData"))._id
  const url = `${process.env.REACT_APP_API_URL}buyer/${buyerId}`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.BUYER_DETAILS, payload: res.data.result })
        localStorage.setItem("buyerData", JSON.stringify(res.data.result))
      }
    }).catch((err) => {
      showToast("error", err);
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
};
export const GetUserInput = (name, value) => (dispatch) => {
  const postData = { name, value }
  dispatch({ type: Types.GET_USER_INPUT, payload: postData })
}
export const SetUserInput = (val) => (dispatch) => {
  dispatch({ type: Types.SET_USER_INPUT, payload: val })
}
export const submitUserInput = (input, x) => (dispatch) => {
  const { buyerName, buyerEmail, buyerPhone, buyerGender, birthDays, birthMonth, birthYear } = input
  if (buyerName.length === 0) {
    showToast('error', "Full name should n't be empty")
    return 0
  } else if (buyerEmail.length === 0) {
    showToast('error', "Email should n't be empty")
    return 0
  } else if (buyerPhone.length === 0) {
    showToast('error', "Phone should n't be empty")
    return 0
  } else if (buyerGender.length === 0) {
    showToast('error', "Please select your gender")
    return 0
  } else if (birthDays.length === 0) {
    showToast('error', "Birth days should n'n be empty")
    return 0
  } else if (birthMonth.length === 0) {
    showToast('error', "Birth month should n'n be empty")
    return 0
  } else if (birthYear.length === 0) {
    showToast('error', "Birth year should n'n be empty")
    return 0
  }
  const buyerId = JSON.parse(localStorage.getItem("buyerData"))._id
  const url = `${process.env.REACT_APP_API_URL}buyer/${buyerId}`;
  dispatch({ type: Types.IS_BUYER_UPDATE_LOADING, payload: true })

  try {
    Axios.put(url, input).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.IS_BUYER_UPDATE_LOADING, payload: false })
        dispatch({ type: Types.USER_UPDATED, payload: ++x })
        dispatch(GetBuyerDetailsByBuyerId())
      }
    }).catch((err) => {
      dispatch({ type: Types.IS_BUYER_UPDATE_LOADING, payload: false })
      showToast("error", err);
    });
  } catch (error) {
    dispatch({ type: Types.IS_BUYER_UPDATE_LOADING, payload: false })
    showToast("error", "Something went wrong");
  }
};
export const GetCategories = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}category`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.CATEGORIES_LIST, payload: res.data.result })
      }
    }).catch((err) => {
      showToast("error", err);
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
}
export const GetSellers = () => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}seller`;
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.SELLERS_LIST, payload: res.data.result })
      }
    }).catch((err) => {
      showToast("error", err);
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
}
export const GetOrderByBuyer = () => (dispatch) => {
  const id = JSON.parse(localStorage.getItem("buyerData"))._id
  const url = `${process.env.REACT_APP_API_URL}order/buyer/${id}`;
  dispatch({ type: Types.IS_ORDER_LIST_LOADING, payload: true })
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.ORDER_LIST, payload: res.data.result })
        dispatch({ type: Types.IS_ORDER_LIST_LOADING, payload: false })
      }
    }).catch((err) => {
      showToast("error", err);
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
}
export const GetOrderById = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_API_URL}order/order-details/${id}`;
  dispatch({ type: Types.IS_ORDER_DETAILS_LOADING, payload: true })
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.ORDER_DETAILS, payload: res.data.result })
        dispatch({ type: Types.IS_ORDER_DETAILS_LOADING, payload: false })
      }
    }).catch((err) => {
      showToast("error", err);
    });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
}