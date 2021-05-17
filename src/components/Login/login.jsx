import React from 'react';
import PropTypes from 'prop-types';
import { useState,setState } from 'react';
import {proxy as url} from '../../../package.json';

async function loginUser(name,id) {
    return fetch(url+'/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name : name,apiKey : "9d5ce7",id : id})
    })
        .then(data => data.json())
}

function Login({ setToken }) {
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [btn, setBtn] = useState({disabled : false,text : "Login"});

    const handleSubmit = async e => {
        e.preventDefault();
        setBtn({disabled : true,text : "Please wait.."});
        const token = await loginUser(username,id);
        setBtn({disabled : false,text : "Login"});
        setToken(token);
    };

    const styles = {
        form : {
            maxWidth : 330,
            margin : '0 auto',
            marginTop : 'calc(50vh - 173px)',
            backgroundColor : "#fff",
            boxShadow : "0 0 2px 1px rgba(0,0,0,0.1)",
            padding : 20,
            borderRadius : 8
        },
        loginText : {
            color : "#537178",
            fontSize : 22
        },
        input : {
            backgroundColor : "#eef1f8"
        }
    };

    return (
        <div className="textCenter">
        <form className="form-signin" onSubmit={e => handleSubmit(e)} style={styles.form}>
        <div className="mb-3" style={styles.loginText}>Login</div>
        <label htmlFor="inputId" className="sr-only">Id</label>
        <input style={styles.input} type="text" id="inputId" className="mb-3 form-control" placeholder="Id" required autoFocus onChange={e => setId(e.target.value)}/>
        <label htmlFor="inputEmail" className="sr-only">Username</label>
        <input style={styles.input} type="text" id="inputEmail" className="mb-3 form-control" placeholder="Username" required onChange={e => setUsername(e.target.value)}/>
        <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={btn.disabled}>{btn.text}</button>
        </form>
        </div>
    );
}

export default Login;

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};