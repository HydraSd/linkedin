import { configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "../reducers"

const store = configureStore({
    reducer:rootReducer,
    middleware : [thunk]
    // middleware: new MiddlewareArray().concat(thunk)
});



export default store