import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  //LogOut Handle
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
    alert("LogOut Succcessfully");
  };
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand ">
            <BiDonateBlood color="red" />
            Blood Bank App
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link ">
                <FaUserCircle />
                Welcome{" "}
                {user?.name ||
                  user?.organisationName ||
                  user?.hospitalName}{" "}
                &nbsp;
                <span className="badge bg-secondary">{user?.role}</span>
              </p>
            </li>
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Header;
