import React from 'react';
import './SideDrawer.css';
import Home from '../Images/home1.png';
import {NavLink} from "react-router-dom";
import SelectFrom from "./SelectFrom";
import SelectTo from "./SelectTo";


const sideDrawer = props => {
    let drawerClasses ='sideDrawer';
    if(props.show){
        drawerClasses = 'sideDrawer open'};

    return(
        <div>

    <nav className={drawerClasses}>
        <header className={"myHeader"}>
            <NavLink to={"./Map"} onClick={props.clicky}>
            <img src={Home} alt="Home"/>
            </NavLink>
            <hr/>
        </header>

        <ul><li>
            <SelectFrom/>
        </li>
            <li><SelectTo/></li>
            <li>
                <a href="/">About</a>
            </li>

            <li>
                <a href="/">FAQS</a>
            </li>

        </ul>
    </nav>
        </div>
            );
};

export default sideDrawer;