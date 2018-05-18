import types from "../actions/types";

const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, action) => {
    console.log(action);
    switch (action.type) {
        default:
            return state;
    }

}
