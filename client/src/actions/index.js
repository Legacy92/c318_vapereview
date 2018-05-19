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


export function addReview(values) {
    const response = axios.post("/api/add-review", values);

    return {
        type: types.ADD_REVIEW,
        payload: response
    }

}

