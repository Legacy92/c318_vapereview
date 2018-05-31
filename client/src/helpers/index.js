import React from 'react';

export function renderInput({ input, label, type, meta: { error, touched } }){
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginTop: '0.5em', border: 'none', borderBottom: '0.1em solid #3f0080', backgroundColor: 'transparent'}} type={ type ? type : 'text'} className="col-10 text-center"/>
            <p className="text-danger">{touched && error}</p> 
        </div>
    )
}

export function renderTextarea({label, input, meta: {touched, error}}) {
    return (
        <div className="container">
            <textarea style={{marginTop: 'o.5em', border: 'none', borderBottom: '0.1em solid #3f0080', backgroundColor: 'transparent'}}  {...input} type="text" autoComplete="off"  placeholder={label} className="col-10 "/>
            <p className="text-danger" >{touched && error}</p>
        </div>
    )
}

export function timeFormat (created) {
    const time = new Date(created);

    return time.toLocaleString('en-US');
}
