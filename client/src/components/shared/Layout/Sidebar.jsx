import React from "react";
//import { userMenu } from './Menus/userMenu'
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../Styles/Layout.css";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {user?.role === "organisation" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" ? "active" : ""}`}
              >
                <i className={"fa-solid fa-warehouse"}></i>
                <Link to="/">Inventory</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === "/donor" ? "active" : ""}`}
              >
                <i className={"fa-solid fa-hand-holding-medical"}></i>
                <Link to="/donor">Donar</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === "/hospital" ? "active" : ""}`}
              >
                <i className={"fa-solid fa-hospital"}></i>
                <Link to="/hospital">Hospital</Link>
              </div>
            </>
          )}
          {(user?.role === "donor" || user?.role==="hospital") && (
            <>
              <div
                className={`menu-item ${location.pathname === "/organisation" ? "active" : ""}`}
              >
                <i className={"fa-sharp fa-solid fa-building-ngo"}></i>
                <Link to="/organisation">Organisation</Link>
              </div>
            </>
          )}
          {( user?.role==="hospital") && (
            <>
              <div
                className={`menu-item ${location.pathname === "/consumer" ? "active" : ""}`}
              >
                <i className={"fa-sharp fa-solid fa-building-ngo"}></i>
                <Link to="/consumer">Consumer</Link>
              </div>
            </>
            
          )}
          {( user?.role==="donor") && (
            <>
              <div
                className={`menu-item ${location.pathname === "/donation" ? "active" : ""}`}
              >
                <i className={"fa-sharp fa-solid fa-building-ngo"}></i>
                <Link to="/donation">Donation</Link>
              </div>
            </>
            
          )}

          {/*{userMenu.map((menu, index) => {
            const isActive = location.pathname === menu.path
            return (
              <div
                key={menu.path || index}
                className={`menu-item ${isActive ? 'active' : ''}`}
              >
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            )
          })}*/}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
