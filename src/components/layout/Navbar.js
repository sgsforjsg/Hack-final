import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import M from "materialize-css";
import { NavLink } from 'react-router-dom'
const Navbar = (props) => {
  const { auth, profile } = props;
  console.log(auth.displayName, '1')
  const link_menu=auth.uid ? <li><NavLink to='/signup'>Profile</NavLink></li> : <li>  <NavLink to='/ori' className="right">signin</NavLink></li> ;
 
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
  useEffect(() => {
    // Update the document title using the browser API

    var sidenav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenav, {});
  }, []);


  return (
    <nav>
      <div className="nav-wrapper">
        <ul className="right hide-in-med-and-down">
          < NavLink to='/view' className="brand-logo center">Noticeboard</NavLink>
          {link_menu}
           </ul>
        <ul
          ref={(Sidenav) => {
            Sidenav = Sidenav;
          }}
          id="slide-out"
          className="sidenav sidenav-close"
        >
          <li><a>Happy To Help(Blogs)</a></li>
          <li><a>Placement offer</a></li>
          <li><a>Placement information</a></li>
          <li><a>Students chat room</a></li>
          <li><a>olx </a></li>
          <li>
            <div className="divider" />
          </li>
          {links}
          <li><a><button>Close</button></a></li>
        </ul>

        <a href="#!" data-target="slide-out" className="sidenav-trigger show-on-large">
          <i className="material-icons">menu</i>
        </a>

      </div>



    </nav>
  )
}

const mapStateToProps = (state) => {
  console.log('app-1', state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)
