import React from 'react';


export function renderInput({ input, label, type, meta: { error, touched } }){
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginTop: 1+'em', border: 'none', borderBottom: '0.2em solid #3f0080', backgroundColor: 'transparent'}} type={ type ? type : 'text'} />
            <p className="text-danger">{touched && error}</p> 
        </div>
    )
}

export function renderTextarea({label, input, meta: {touched, error}}) {
    return (
        <div className="container">
            <textarea style={{marginTop: 1+'em', border: 'none', borderBottom: '0.2em solid #3f0080', backgroundColor: 'transparent'}}  {...input} type="text" autoComplete="off"  placeholder={label} className="col-xs-10 col-xs-offset-1"/>
            <p className="red-text text-darken-2" style={{textAlign: 'left'}}>{touched && error}</p>
        </div>
    )
}
