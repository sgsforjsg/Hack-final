import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  console.log(props,"Signed Links ")
  return (
    <div>
      <li><NavLink to='/create'>POST Notice </NavLink></li>
      <li><NavLink to='/view'>View </NavLink></li>
       <li><a onClick={props.signOut}>Sign Out</a></li>
       <li><a>Dictionary</a></li>              
          <li><a>Post jobs(by company) </a></li>
          <li><a>Post Placement information </a></li>
          <li><a>User Authorisation</a></li>
          <li><a>Post olx add </a></li>
      {/*
        <li><NavLink to='/create/:id'>Create Notice with ID </NavLink></li>
        <li><NavLink to='/media/:id'>Create Notice </NavLink></li>
     <li><NavLink to='/edit/:id'>Create Notice </NavLink></li>

     
       <li><NavLink to='/' className="btn btn-floating pink lighten-1">{props.profile.initials}</NavLink></li>*/}

    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
