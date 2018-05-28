import React from 'react';


export function renderInput({ input, label, type, meta: { error, touched } }){
    return (
        <div>
            <label>{label}</label>
            <input {...input} type={ type ? type : 'text'} />
            <p className="text-danger">{touched && error}</p> 
        </div>
    )
}