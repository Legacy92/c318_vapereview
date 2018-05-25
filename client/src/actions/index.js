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
    const response = axios.get("/api/single-juice", {
        params: juiceId
    });


    return {
        type: types.SINGLE_ITEM,
        payload: response 
    }
}

export function categories() {
    const response = axios.get("/api/category-modal");
    console.log("categories: ", response);

    return {
        type: types.CATEGORIES,
        payload: response
    }
}

export function flavors() {
    const response = axios.get("/api/flavor-modal");
    console.log("flavors: ", response);

    return {
        type: types.FLAVORS,
        payload: response
    }
}