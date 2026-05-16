// ================= NAVBAR.JS =================

import React, {
  useEffect,
  useState,
  useRef,
} from "react";

import "./Navbar.css";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import Cookies from "js-cookie";

const Navbar = () => {

  const [user, setUser] =
    useState(null);

  const [showDropdown,
    setShowDropdown] =
    useState(false);

  const navigate =
    useNavigate();

  const dropdownRef =
    useRef();

  // ================= LOAD USER =================

  useEffect(() => {

    const loadUser = () => {

      try {

        const storedUser =
          localStorage.getItem(
            "user"
          );

        if (
          storedUser &&
          storedUser !==
            "undefined"
        ) {

          setUser(
            JSON.parse(
              storedUser
            )
          );

        } else {

          setUser(null);

        }

      } catch (error) {

        console.error(
          "User parse error:",
          error
        );

        localStorage.removeItem(
          "user"
        );

        setUser(null);
      }
    };

    loadUser();

    // ✅ LISTENER

    window.addEventListener(
      "storage",
      loadUser
    );

    window.addEventListener(
      "userChanged",
      loadUser
    );

    return () => {

      window.removeEventListener(
        "storage",
        loadUser
      );

      window.removeEventListener(
        "userChanged",
        loadUser
      );
    };

  }, []);

  // ================= OUTSIDE CLICK =================

  useEffect(() => {

    const handleClickOutside =
      (e) => {

        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            e.target
          )
        ) {
          setShowDropdown(false);
        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  // ================= LOGOUT =================

  const handleLogout = () => {

    Cookies.remove(
      "accessToken"
    );

    Cookies.remove(
      "userId"
    );

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "userId"
    );

    // ✅ UPDATE NAVBAR

    window.dispatchEvent(
      new Event("userChanged")
    );

    setUser(null);

    setShowDropdown(false);

    navigate("/");
  };

  return (

    <div className="navbar">

      {/* ================= LOGO ================= */}

      <div
        className="logo"
        onClick={() =>
          navigate("/")
        }
      >

        <h2>HARMONY</h2>

        <h3>
          EVENT MANAGEMENT
        </h3>

      </div>

      {/* ================= MENU ================= */}

      <div className="menu">

        <ul>

          <li>
            <Link to="/">
              Home
            </Link>
          </li>

          <li>
            <Link to="/about">
              About
            </Link>
          </li>

          <li>
            <Link to="/event">
              Event
            </Link>
          </li>

          <li>
            <Link to="/gallery">
              Gallery
            </Link>
          </li>

          <li>
            <Link to="/contact">
              Contact
            </Link>
          </li>

        </ul>

      </div>

      {/* ================= RIGHT ================= */}

      <div className="right-section">

        {user ? (

          <div
            className="profile-section"
            ref={dropdownRef}
          >

            <div
              className="profile-info"
              onClick={() =>
                setShowDropdown(
                  !showDropdown
                )
              }
            >

              {user?.profileImage ? (

                <img
                  src={
                    user.profileImage
                  }
                  alt={user.name}
                  className="profile-img"
                />

              ) : (

                <div className="default-avatar">

                  {user?.name?.charAt(
                    0
                  )}

                </div>

              )}

              <span>
                {user?.name}
              </span>

            </div>

            {/* ================= DROPDOWN ================= */}

            {showDropdown && (

              <div className="dropdown">

                <ul>

                  {/* ACCOUNT */}

                  <li
                    onClick={() => {

                      setShowDropdown(
                        false
                      );

                      navigate(
                        "/account"
                      );
                    }}
                  >
                    Account
                  </li>

                  {/* MY BOOKING */}

                  <li
                    onClick={() => {

                      setShowDropdown(
                        false
                      );

                      navigate(
                        "/mybooking"
                      );
                    }}
                  >
                    My Booking
                  </li>

                  {/* LOGOUT */}

                  <li
                    onClick={
                      handleLogout
                    }
                  >
                    Logout
                  </li>

                </ul>

              </div>

            )}

          </div>

        ) : (

          <button
            className="btn"
            onClick={() =>
              navigate("/login")
            }
          >
            LOGIN
          </button>

        )}

      </div>

    </div>
  );
};

export default Navbar;