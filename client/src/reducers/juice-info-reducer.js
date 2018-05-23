import types from "../actions/types";

const DEFAULT_STATE = {
    all:[],
    juice: {},
    juiceId: [],
    randomJuice:{}
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
                juiceId : action.payload.data.data.insertId,
                all : action.payload.data.data
            };
        case types.SEARCH_BY_NAME:
            console.log("JuiceDataAction:", action);
            return {...state, all : action.payload.data.data, juice: action.payload.data.data[0].juice_id};
        case types.SEARCH_BY_ANY:
            console.log("Search by any on Home page action:", action);
            return {...state, all : action.payload.data.data, juice: action.payload.data.data[0].juice_id};
        case types.GET_RANDOM_JUICE:
            return {...state, randomJuice : action.payload.data.data};
        case types.BROWSE_ALL_JUICES:
            return {...state, all : action.payload.data.data};
        default:
            return state;
    }

}
