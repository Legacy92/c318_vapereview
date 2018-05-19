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

export function pullJuiceData() {
    const response = axios.get("/api/test");

    return {
        type: types.PULL_JUICE_DATA,
        payload: response
    }



}

// app.get("/api/test",(req, res, next) => {
//
//     let query = 'SELECT * FROM ??';
//     let inserts =['juices'];
//
//     let sql = mysql.format(query, inserts);
//
//     console.log(sql);
//
//     database.query(sql, (err,results,field)=>{
//         if(err) return next (err);
//
//         const output = {
//             success: true,
//             data: results
//         }
//         res.json(output);
//     });
// });