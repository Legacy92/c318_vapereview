import types from "../actions/types";

const DEFAULT_STATE = {
    all:[],
    juice: {}
};

export default (state = DEFAULT_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case types.PULL_JUICE_DATA:
            console.log("JuiceDataAction:", action);
            return {...state, all : action.payload.data.data};

            case types.SEARCH_BY_NAME:
            console.log("JuiceDataAction:", action);
            return {...state, all : action.payload.data.data, juice: action.payload.data.data[0].juice_id};

        default:
            return state;
    }

}
