import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootreducers from "./components/redux/reducers/main";
import { applyMiddleware, createStore } from "redux";

const middleWare = [thunk];

const store = createStore(
    rootreducers,
    composeWithDevTools(applyMiddleware(...middleWare)),
)

export default store;
