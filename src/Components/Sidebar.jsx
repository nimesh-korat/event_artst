import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  async function handleLogout() {
    localStorage.removeItem("token");
  }

  return (
    <>
      <div>
        {/* partial:partials/_sidebar */}
        <nav className="sidebar sidebar-offcanvas " id="sidebar">
          <ul className="nav" style={{ position: "fixed", zIndex: "1" }}>
            <li className="nav-item nav-profile border-bottom">
              <Link to="/profile" className="nav-link flex-column">
                <div className="nav-profile-image">
                  <img src={"/images/faces/face27.jpg"} alt="profile" />
                </div>
                <div className="nav-profile-text d-flex ml-0 mb-3 flex-column">
                  <span className="font-weight-semibold mb-1 mt-2 text-center">
                    Artist Panel
                  </span>
                </div>
              </Link>
            </li>
            <li className="pt-2 pb-1">
              <span className="nav-item-head">Dashboard</span>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="mdi mdi-home menu-icon" />
                <span className="menu-title">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addEvent">
                <i className="mdi mdi-contacts menu-icon" />
                <span className="menu-title">Add Event</span>
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#ui-basic1"
                aria-expanded="false"
                aria-controls="ui-basic"
              >
                <i className="mdi mdi-calendar-multiple-check menu-icon" />
                <span className="menu-title">Event</span>
                <i className="menu-arrow" />
              </a>
              <div className="collapse" id="ui-basic1">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link className="nav-link" to="/upcomingevent">
                      Upcoming Event
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/oldevent">
                      Old Event
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/newbooking">
                <i className="mdi mdi-library-music menu-icon" />
                <span className="menu-title">Booking</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/payment">
                <i className="mdi mdi-currency-inr menu-icon" />
                <span className="menu-title">Payment</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/feedback">
                <i className="mdi mdi-clipboard-text menu-icon" />
                <span className="menu-title">Feedback</span>
              </Link>
            </li>
            <li className="nav-item" onClick={handleLogout}>
              <a className="nav-link" href="/">
                <i className="mdi mdi-login menu-icon" />
                <span className="menu-title">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
