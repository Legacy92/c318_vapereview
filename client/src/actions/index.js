import types from "./types";
import axios from "axios";

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
    const response = axios.get("/api/multiple-results-browse");

    return{
        type: types.BROWSE_ALL_JUICES,
        payload: response
    }
}

export function getRandomJuice(){
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

export function singleItem(juice_id) {
    const response = axios.get("/api/single-juice-info", {
        params: { juice_id }
    });

    return {
        type: types.SINGLE_ITEM,
        payload: response 
    }
}

export function singleItemReviews(juice_id) {
    const response = axios.get("/api/single-juice-reviews", {
        params: { juice_id }
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

export function setCategory(id, category) {
    return async dispatch => {

        const response = await axios.get("/api/flavor-modal", {
            params: {category: id}
        });

        dispatch({
            type: types.SET_CATEGORY,
            payload: response.data.data,
            selectedCategory: {id, name: category}
        });
    }
}

export function setFlavor(id, flavor) {
    return {
        type: types.SET_FLAVOR,
        selectedFlavor: {id, name: flavor}
    }
}

export function addSelectedFlavor(){
    return {
        type: types.ADD_SELECTED_FLAVOR
    }
}

export function signUp(credentials){
    return async (dispatch) => {
        try {
            const response = await axios.post('/auth/sign-up', credentials);


            localStorage.setItem('token', response.data.token);
    
            dispatch({
                type: types.SIGN_UP
            });
        } catch(err){
            console.log('Sign Up Error:', err.response.data);
        }

    }
}

export function signIn(credentials){
    return async (dispatch) => {
        try {
            const response = await axios.post(`/auth/sign-in`, credentials);

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

export function authTest(){
    return async dispatch => {
        try {
            const resp = await axios.post('/auth/test', {test: 'stuff'}, setAuthHeaders());

            console.log('Auth Test Resp:', resp);
        } catch(err){
            console.log('Auth Test ERROR:', err.message);
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

function setAuthHeaders(){
    return {
        headers: {
            authorization: localStorage.getItem('token')
        }
    }
}
