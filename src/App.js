// App.js
import './App.css';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';

// User Components
import Home from './Components/User/Home/Home';
import Event from './Components/User/Event/Event';
import Navbar from './Components/User/Navbar/Navbar';
import About from './Components/User/About/About';
import Gallery from './Components/User/Gallery/Gallery';
import Contact from './Components/User/Contact/Contact';
import Booking from './Components/User/Booking/Booking';
import Login from './Components/User/Login/Login';
import Signup from './Components/User/Signup/Signup';
import Dashboard from './Components/User/Dashboard/Dashboard.js';
import Account from './Components/User/Account/Account.js';
import Edituser from './Components/User/Edituserdetail/Edituser.js';
import Changepassword from './Components/User/Changrepassword/Changepassword.js';
import Eventdetail from "./Components/User/Eventdetail/Eventdetail.js"


// Admin Components
import LoginAdmin from './Components/Admin/Login/Login';
import Profile from './Components/Admin/Profile/Profile';
import UserList from './Components/Admin/UserList/UserList';
import PrivateAdminLayout from './Layout';
import Eventpost from './Components/Admin/Eventpost/Eventpost.js';
import Postcategories from './Components/Admin/Postcategories/Postcategories';
import Addgallery from './Components/Admin/Addgallery/Addgallery.js';
import Contactlist from './Components/Admin/Contactlist/Contactlist.js';
import Mainprofile from './Components/Admin/Mainprofile/Mainprofile.js';
import AdminDashboard from './Components/Admin/AdminDashbaord/AdminDashboard.js';
import BookTicket from './Components/User/Bookticket/Bookticket.js';
import AdminBookings from './Components/Admin/AdminBookTicket/AdminBookTicket.js';
import PaymentPage from './Components/User/Paymentdetail/Paymentdetail.js';
import MyBooking from './Components/User/MyBooking/MyBooking.js';
import DownloadTicket from './Components/User/DownloadTicket/DownloadTicket.js';
import Events from './Components/User/Events/Events.js';

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ redirect: location.pathname, bookingState: location.state }} replace />;
  }
  return children;
}
function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/event" element={<Event />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
       
        <Route path="/events/:id" element={<Events />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/edituser" element={<Edituser />} />
        <Route path="/changepassword" element={<Changepassword />} />
        <Route path='/event-details/:id' element={<Eventdetail/>}/>
        <Route path="/book/:id" element={<PrivateRoute><BookTicket/></PrivateRoute>} />
        <Route path="/payment" element={<PaymentPage/>} />
        <Route path="/mybooking" element={<MyBooking/>} />
        <Route path="/download-ticket" element={<DownloadTicket/>} />

      



        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin" element={<PrivateAdminLayout />}>
          <Route index element={<Navigate to="admindashboard" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="userlist" element={<UserList />} />
          <Route path="eventpost" element={<Eventpost />} />
          <Route path="post-category" element={<Postcategories />} />
          <Route path="addgallery" element={<Addgallery />} />
          <Route path="contactlist" element={<Contactlist />} />
          <Route path="/admin/Admindashboard" element ={<AdminDashboard/>}/>
          <Route path="mainprofile" element={<Mainprofile />} />
          <Route path="/admin/bookticket" element={<AdminBookings/>}/>
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
