import { getProductsReducer } from "./ProductsReducer";
import {combineReducers} from "redux";

const rootreducers = combineReducers({
    getproductsdata: getProductsReducer,
})


export default rootreducers;
