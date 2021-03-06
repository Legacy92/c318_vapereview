import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import juiceReducer from "./juice-info-reducer";
import userReducer from './user_reducer'

export default combineReducers({
    form: formReducer,
    juiceInfo: juiceReducer,
    user: userReducer
});
