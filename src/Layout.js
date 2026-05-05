// import React from 'react';
// import Profile from './Components/Admin/Profile/Profile'; // Sidebar
// import { Outlet } from 'react-router-dom';
// import './Layout.css'; // Optional: for clean CSS

// function PrivateAdminLayout() {
//   return (
//     <div className="admin-dashboard">
//       <Profile />
//       <div className="admin-content">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default PrivateAdminLayout;


import React from 'react';
import Profile from './Components/Admin/Profile/Profile';
import { Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';

function PrivateAdminLayout() {
   const navigate = useNavigate();
  return (
    <div className="admin-dashboard">
      <Profile />
      <div className="main-section">
        <div className="admin-navbar">
          <div className="admin-title">Admin</div>
          <div className="admin-right">
            <div className="circle-pic"></div>
            <div>
              <div className="admin-role">Event Management</div>
              <div onClick={() => navigate('mainprofile')} className="admin-subrole">Admin</div>
            </div>
          </div>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PrivateAdminLayout;
