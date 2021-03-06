import types from "../actions/types";

const DEFAULT_STATE = {
    all:[],
    juice: {},
    juiceId: [],
    singleItemInfo: {},
    singleItemReviewsData: [],
    categories: [],
    flavors: [],
    selectedCategory: {},
    selectedFlavor: '',
    flavorList: [],
    randomJuiceId: [],
    singleItemReviewsData: [],
    reviewFlavors:[],
    searchTerm:"",
    chartData:{}
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.PULL_JUICE_DATA:
            return {...state, all : action.payload.data.data};
        case types.ADD_PRODUCT:
            return{...state, juiceId: action.payload.data.data.insertId, all: action.payload.data.data};
        case types.SEARCH_BY_NAME:
            return {...state, all: action.payload.data.data, juiceId: action.payload.data.data.id};
        case types.SEARCH_BY_ANY:
            return {...state, all: action.payload.data.juices};
        case types.BROWSE_ALL_JUICES:
            return {...state, all: action.payload.data.juices};
        case types.GET_RANDOM_JUICE:
        case types.SINGLE_ITEM:
            return {...state, singleItemInfo: action.payload.data.juice};
        case types.GET_CATEGORIES:
            return {...state, categories: action.payload.data.categories};
        case types.SET_CATEGORY:
            return {...state, flavors: action.payload, selectedFlavor: '', selectedCategory: action.selectedCategory};
        case types.SET_FLAVOR:
            return {...state, selectedFlavor: action.selectedFlavor};
        case types.ADD_SELECTED_FLAVOR:
            const newFlavor = {
                category: state.selectedCategory,
                flavor: state.selectedFlavor
            };
            const reviewFlavor= state.selectedFlavor.id;
            return {...state, selectedCategory: {}, selectedFlavor: {}, flavors: [], flavorList: [...state.flavorList, newFlavor], reviewFlavors:[...state.reviewFlavors, reviewFlavor]};
        case types.GET_SINGLE_ITEM_REVIEWS:
            return {...state, singleItemReviewsData: action.payload.data.reviews};            
        case types.CLEAR_SINGLE_ITEM:
            return {...state, singleItemReviewsData: [], juiceId: []};
        case types.SET_SEARCH_TERM:
            return {...state, searchTerm: action.payload};
        case types.GET_CHART_DATA:
            return {...state, chartData: action.payload.data.data};
        case types.CLEAR_REVIEW_FLAVORS:
            return {...state, categories: [], flavors: [], selectedCategory: {}, selectedFlavor: '', flavorList: [], reviewFlavors: []};
        default:
            return state;
    }
}
