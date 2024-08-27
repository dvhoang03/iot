import React, { useState } from 'react'
import iott from "../Assets/iott.png"
import profile from "../Assets/profile.png"
import "./Navbar.css"
import { Link } from "react-router-dom";


function Navbar() {
    const [menu, setMenu] = useState("dashboarch");
    return (
        <div className="navbar">
            <div className="nav-logo" >
                <img src={iott} alt="" />
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("dashboarch") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Dashboarch</Link>{menu === "dashboarch" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("datasensor") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/datasensor'>Datasensor</Link>{menu === "datasensor" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("actionhistory") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/actionhistory'>Action history</Link>{menu === "actionhistory" ? <hr /> : <></>}</li>
            </ul>
            <div className="profile">
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/profile'><img src={profile} alt="" className="profile_icon" />
                    <p >Profile</p>
                </Link>

            </div>
        </div>
    )
}

export default Navbar
