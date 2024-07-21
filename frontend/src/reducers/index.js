import { combineReducers } from "redux";
import {
    productsListReducer,
    productDetailsReducer,
    createProductReducer,
    updateProductReducer,
    deleteProductReducer,
    changeDeliveryStatusReducer,
} from "./productReducers";

import {
    createCardReducer,
    chargeCardReducer,
    savedCardsListReducer,
    deleteSavedCardReducer,
    updateStripeCardtReducer
} from "./cardReducers";

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userDetailsUpdateReducer,
    deleteUserAccountReducer,
    checkTokenValidationReducer,
    getSingleAddressReducer,
    getAllAddressesOfUserReducer,
    createUserAddressReducer,
    updateUserAddressReducer,
    deleteUserAddressReducer,
    getAllOrdersReducer,
} from "./userReducers";
