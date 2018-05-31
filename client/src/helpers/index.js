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
    console.log(time.toLocaleTimeString('en-US'));
    return time.toLocaleString('en-US');


}
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto deserunt ea incidunt iure iusto magni minima quas vitae! Commodi, eaque earum enim eum facere id itaque magnam, minus natus necessitatibus numquam odio quibusdam quo repudiandae sequi, soluta tenetur. Ad aut dignissimos ea magnam non optio sequi? Adipisci commodi eaque eligendi est non perspiciatis totam! Beatae?</p>