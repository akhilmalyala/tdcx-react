import React from 'react';

const Navbar = (props) => {
    const logoutHandler = (e) => {
        e.preventDefault();
        props.onLogout();
    };

    const styles = {
        img : {
            backgroundColor: "#ccc",
            borderRadius: "50%",
            textAlign: "center",
            width: 33,
            height: 33
        }
    };

    return (
        <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand" href="#">
            <img src="/man.svg" width="30" height="30" className="d-inline-block align-top mr-2" alt="" style={styles.img}/>
            <span>{props.name}</span>
        </a>
        <ul className="navbar-nav">
            <li className="nav-item active">
                <a className="nav-link" href="/" onClick={e => logoutHandler(e)}>Logout <span className="sr-only">Logout</span></a>
            </li>
        </ul>
        </nav>
    );
};

export default Navbar;