import types from "./types";
import axios from "axios";

const BASE_URL = "http://api.reactprototypes.com";
const API_KEY = "?key=bigPimpin";



export function addProduct(item) {
    const response = axios.post(`${BASE_URL}/todos${API_KEY}`, item);

    return {
        type: types.ADD_ITEM,
        payload: response
    }

}