import types from "../actions/types";

const DEFAULT_STATE = {
    all:[],
    juice: {},
    createdJuice: [],
};

export default (state = DEFAULT_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case types.PULL_JUICE_DATA:
            console.log("JuiceDataAction:", action);
            return {...state, all : action.payload.data.data};
        case types.ADD_PRODUCT:
            console.log('Add Product Action:', action);
            return{...state, 
                createdJuice : action.payload.data.data.insertId,
                all : action.payload.data.data
            }

        default:
            return state;
    }

}
