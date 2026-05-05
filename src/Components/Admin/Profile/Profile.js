// import React from 'react'
// import './Profile.css'
// import { Link } from 'react-router-dom'

// function Profile() {
//   return (
//    <div className='profile'>
//     <div className='sidebar'>
//       <ul>
//         <li><Link to="/userlist">User List</Link></li>
//         <li><Link to="/eventpost">Event Post</Link></li>
//         <li><Link to="/postcategories">Post Category</Link></li>
//         <li><Link to="/addgallery">Add Gallery</Link></li>
//         <li><Link to="/contactlist">Contact List</Link></li>
//         <li><Link to="/auth">Authentication</Link></li>
//         <li><Link to="/logout">Log Out</Link></li>
//       </ul>
//     </div>
//      <div className="navbar">
//       <h4>Admin</h4>
//       <div className="profile-info">
//         <span>Event Management</span>
//         <span>Admin</span>
//         <div className="profile-circle"></div>
//       </div>
//     </div>
//    </div>
//   )
// }

// export default Profile

import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

 
const Sidebar = () => {
  return (
    <>
      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="sidebar">
          <ul className="menu">
            <li>
              <Link to="/admin/userlist" className="sidebar-link">
                 <h4>User List</h4>
              </Link>
            </li>
            <li>
              <Link to="/admin/eventpost" className="sidebar-link">
                  <h4>Event Post</h4>
              </Link>
            </li>
            <li>
              <Link to="/admin/post-category" className="sidebar-link">
                 <h4>Post Category</h4>
              </Link>
            </li>
            <li>
              <Link to="/admin/addgallery" className="sidebar-link">
                <h4> Add Gallery</h4>
              </Link>
            </li>
            <li>
              <Link to="/admin/contactlist" className="sidebar-link">
                <h4>Contact List</h4>
              </Link>
            </li>
            <li>
              <Link to="/admin/bookticket" className="sidebar-link">
                <h4>BookTicket</h4>
              </Link>
            </li>
          </ul>
 
          <div className="section-title">Authentication</div>
          <ul className="menu">
            <li>
              <Link to ="/admin/login" className="logout-link">
                <h4>Log Out</h4>
              </Link>
            </li>
          </ul>
        </div>
 
        {/* <div className="main-content">
         
 
          <div className="navbar1">
            <div className="navbar-left">
              <h3>Admin</h3>
            </div>
            <div className="header">
              <div className="profile-circle"></div>
              <div className="header-text">
                <p className="title">Event Management</p>
                <p className="subtitle">Admin</p>
              </div>
            </div>
          </div>
 
          <div className="content-area"></div>
        </div> */}
        {/* <div className="profilechanges">
          <div className="profilephoto">
            <img src=""></img>
          </div>
        </div> */}
      </div>
    </>
  );
};
 
export default Sidebar;
