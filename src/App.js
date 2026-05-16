import "./App.css";

import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";

// ================= USER =================
import Home from "./Components/User/Home/Home";
import Event from "./Components/User/Event/Event";
import Navbar from "./Components/User/Navbar/Navbar";
import About from "./Components/User/About/About";
import Gallery from "./Components/User/Gallery/Gallery";
import Contact from "./Components/User/Contact/Contact";
import Booking from "./Components/User/Booking/Booking";
import Login from "./Components/User/Login/Login";
import Signup from "./Components/User/Signup/Signup";
import Dashboard from "./Components/User/Dashboard/Dashboard";
import Account from "./Components/User/Account/Account";
import Edituser from "./Components/User/Edituserdetail/Edituser";
import Changepassword from "./Components/User/Changrepassword/Changepassword";
import Eventdetail from "./Components/User/Eventdetail/Eventdetail";
import BookTicket from "./Components/User/Bookticket/Bookticket";
import PaymentPage from "./Components/User/Paymentdetail/Paymentdetail";
import MyBooking from "./Components/User/MyBooking/MyBooking";
import DownloadTicket from "./Components/User/DownloadTicket/DownloadTicket";
import Events from "./Components/User/Events/Events";

// ================= ADMIN =================
import LoginAdmin from "./Components/Admin/Login/Login";
import Profile from "./Components/Admin/Profile/Profile";
import UserList from "./Components/Admin/UserList/UserList";
import PrivateAdminLayout from "./Layout";
import Eventpost from "./Components/Admin/Eventpost/Eventpost";
import Postcategories from "./Components/Admin/Postcategories/Postcategories";
import Addgallery from "./Components/Admin/Addgallery/Addgallery";
import Contactlist from "./Components/Admin/Contactlist/Contactlist";
import Mainprofile from "./Components/Admin/Mainprofile/Mainprofile";
import AdminDashboard from "./Components/Admin/AdminDashbaord/AdminDashboard";
import AdminBookings from "./Components/Admin/AdminBookTicket/AdminBookTicket";

// ================= PRIVATE ROUTE =================
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
}

// ================= APP CONTENT =================
function AppContent() {
  const location = useLocation();

  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* ================= USER ROUTES ================= */}
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
        <Route path="/account" element={<Account />} />
        <Route path="/edituser" element={<Edituser />} />
        <Route path="/changepassword" element={<Changepassword />} />
        <Route path="/event-details/:id" element={<Eventdetail />} />

        {/* BOOK TICKET */}
        <Route
          path="/book/:id"
          element={
            <PrivateRoute>
              <BookTicket />
            </PrivateRoute>
          }
        />

        {/* PAYMENT */}
        <Route path="/payment" element={<PaymentPage />} />

        {/* MY BOOKING */}
        <Route path="/mybooking" element={<MyBooking />} />

        {/* DOWNLOAD TICKET */}
        <Route path="/download-ticket" element={<DownloadTicket />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin/login" element={<LoginAdmin />} />

        <Route path="/admin" element={<PrivateAdminLayout />}>
          <Route index element={<Navigate to="admindashboard" replace />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="userlist" element={<UserList />} />
          <Route path="eventpost" element={<Eventpost />} />
          <Route path="post-category" element={<Postcategories />} />
          <Route path="addgallery" element={<Addgallery />} />
          <Route path="contactlist" element={<Contactlist />} />
          <Route path="mainprofile" element={<Mainprofile />} />
          <Route path="bookticket" element={<AdminBookings />} />
        </Route>

        {/* ================= FIXED FALLBACK ================= */}
        <Route
          path="*"
          element={
            <div style={{ padding: "20px" }}>
              <h2>❌ Route Not Found</h2>
              <p>Check URL or navigate properly from app.</p>
            </div>
          }
        />

      </Routes>
    </>
  );
}

// ================= APP =================
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;