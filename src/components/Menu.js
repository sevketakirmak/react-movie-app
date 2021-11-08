import React from "react";
import {Link } from "react-router-dom";
import "./Menu.css"

const Menu = () =>{
    return(
        <div className="menu">
            <div>Movie App</div>
            <div>
                <Link to="/" >Main Page</Link>
            </div>

        </div>
    );
}

export default Menu;