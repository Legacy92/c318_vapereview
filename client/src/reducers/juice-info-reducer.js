import types from "../actions/types";

const DEFAULT_STATE = {
    all:[],
    juice: {},
    juiceId: [],
    singleItemInfo: {},
    singleItemReviews: [],
    randomJuiceId: [],
    singleItemReviewsData: []
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.PULL_JUICE_DATA:
            console.log("JuiceDataAction:", action);
            return {...state, all : action.payload.data.data};
        case types.ADD_PRODUCT:
            // console.log('Add Product Action:', action);
            return{...state, 
                juiceId : action.payload.data.data.insertId,
                all : action.payload.data.data
            };
        case types.SEARCH_BY_NAME:
            // console.log("JuiceDataAction:", action);
            return {...state, all : action.payload.data.data, juiceId: action.payload.data.data.id};
        case types.SEARCH_BY_ANY:
            console.log("JuiceDataAction:", action);
            // console.log("Search by any on Home page action:", action);
            return {...state, all : action.payload.data.data, juiceId: action.payload.data.data.id};
        
        // console.log('get random juice:', action);
        //     return {...state, randomJuiceId: action.payload.data.data.id, juice: action.payload.data.data};
        case types.BROWSE_ALL_JUICES:
            return {...state, all : action.payload.data.data};
        case types.GET_RANDOM_JUICE:
        case types.SINGLE_ITEM:
            console.log("Single_Item Active", action);
            return {...state, singleItemInfo: action.payload.data.data};
        case types.CATEGORIES:
            return {...state, all: action.payload.data.data};
            console.log("Categories: ", action);
        case types.FLAVORS: 
            return {...state, all: action.payload.data.data};
        case types.GET_SINGLE_ITEM_REVIEWS:
            console.log("Single_Item Reviews", action);
                return {...state, singleItemReviewsData: action.payload.data.data};
        case types.CLEAR_SINGLE_ITEM:
                return {...state, singleItemReviewsData: [], juiceId: []};
        default:
            return state;
    }

}

// if(!this.props.randomJuice){

//     console.log('response not yet loaded');
// }else{
//     return (
//         <h1>Loading</h1>
//     )

// }