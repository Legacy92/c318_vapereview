import types from "./types";
import axios from "axios";



export function createAccount(values) {
    console.log("Form Values:", values);
    const response = axios.post("/api/create-user", values);


return {
    type: types.CREATE_ACCOUNT,
    payload: response
}
}

export function addProduct(values) {
    const response = axios.post("/api/add-product", values);

    return {
        type: types.ADD_PRODUCT,
        payload: response
    }

}

export function searchByFlavorName(values){
    const response = axios.get("/api/multiple-results", values);

    return{
        type: types.SEARCH_BY_NAME,
        payload: response
    }
}

export function landingPageSearch(values){
    console.log("Search Values:", values);
    const response = axios.get("/api/multiple-results", {
        params: values
    });

    return{
        type: types.SEARCH_BY_ANY,
        payload: response
    }
}

export function browseAllJuices(){
    console.log('browse all function called');
    const response = axios.get("/api/multiple-results-browse");

    return{
        type: types.BROWSE_ALL_JUICES,
        payload: response
    }
}

export function getRandomJuice(){
    console.log('get random juice function called');
    const response = axios.get("/api/random-juice");

    return{
        type: types.GET_RANDOM_JUICE,
        payload: response
    }
}
export function addReview(values) {
    const response = axios.post("/api/add-review", values);

    return {
        type: types.ADD_REVIEW,
        payload: response
    }

}

export function pullJuiceData() {
    const response = axios.get("/api/test");

    return {
        type: types.PULL_JUICE_DATA,
        payload: response
    }
}

export function singleItem(juiceId) {
    console.log(juiceId);
    const response = axios.get("/api/single-juice-info", {
        params: juiceId
    });

    return {
        type: types.SINGLE_ITEM,
        payload: response 
    }
}

export function singleItemReviews(juiceId) {
    console.log(juiceId);
    const response = axios.get("/api/single-juice-reviews", {
        params: juiceId
    });

    return {
        type: types.GET_SINGLE_ITEM_REVIEWS,
        payload: response
    }
}


export function getCategories() {
    const response = axios.get("/api/category-modal");
    
    return {
        type: types.GET_CATEGORIES,
        payload: response
    }
}

export function getFlavors(id) {
    const response = axios.get("/api/flavor-modal", {
        params: {category: id}
    });

    return {
        type: types.GET_FLAVORS,
        payload: response
    }
}


// User Auth Actions // //change Base URL 
const BASE_URL = 'http://api.reactprototypes.com'

export function signUp(credentials){
    return async (dispatch) => {
        try {
            const response = await axios.post(`${BASE_URL}/signup`, credentials);

            localStorage.setItem('token', response.data.token);
    
            dispatch({
                type: types.SIGN_UP
            });
        } catch(err){
            if(err.response && err.response.data){
                return dispatch({
                    type: types.AUTH_ERROR,
                    error: err.response.data.error
                });
            }

            dispatch({
                type: types.AUTH_ERROR,
                error: 'Error creating new account'
            });
        }

    }
}

export function signIn(credentials){
    return async (dispatch) => {
        try {
            const response = await axios.post(`${BASE_URL}/signin`, credentials);

            localStorage.setItem('token', response.data.token);
    
            dispatch({
                type: types.SIGN_IN
            });
        } catch(err){
            dispatch({
                type: types.AUTH_ERROR,
                error: 'Invalid email and/or password'
            })
        }
    }
}

export function signOut() {
    localStorage.removeItem("token");

    return {
        type: types.SIGN_OUT
    }
}

export function clearAuthError(){
    return {
        type: types.CLEAR_AUTH_ERROR
    };
}