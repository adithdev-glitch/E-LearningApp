import React from "react";
import '../../assets/vendors/typicons/typicons.css'
import { Link } from "react-router-dom";
import '../../assets/css/style.css'
import './Common.css'
import { UserData } from "../../context/UserContext";


const Sidebar = () => {
  const { user } = UserData();
  return (
    
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        {
          user && user.mainrole === "superadmin" && (
            <li className="nav-item">
          <Link className="nav-link" to={"/admin/dashboard"}>
            <i className="typcn typcn-device-desktop menu-icon"></i>
            <span className="menu-title">Dashboard</span>
            <div className="badge badge-danger">new</div>
          </Link>
        </li>
          )
        }

        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
            <i className="typcn typcn-document-text menu-icon"></i>
            <span className="menu-title">Courses</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/course"}>Newly Arrived</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/course"}>Trending</Link>
              </li>
            </ul>
          </div>
        </li>

        {
          user && user.mainrole === "superadmin" && (
            <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
          <i className="typcn typcn-mortar-board menu-icon"></i>
            <span className="menu-title">Users</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="form-elements">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/users"}>All Users</Link>
              </li>
            </ul>
          </div>
        </li>
        
          )
        }
        {
          user && user.mainrole === "superadmin" && (
            <li className="nav-item">
          <Link className="nav-link" to={"/admin/feedbacks"}>
            <i className="typcn typcn-device-desktop menu-icon"></i>
            <span className="menu-title">Feedbacks</span>
            <div className="badge badge-danger">new</div>
          </Link>
        </li>
          )
        }
        {
          user && user.mainrole === "superadmin" && (
            <li className="nav-item">
          <Link className="nav-link" to={"/admin/orders"}>
            <i className="typcn typcn-device-desktop menu-icon"></i>
            <span className="menu-title">Orders</span>
          </Link>
        </li>
          )
        }

        <li className="nav-item">
          <Link className="nav-link" to={"/account"}>
            <i className="typcn typcn-arrow-back-outline menu-icon"></i>
            <span className="menu-title">Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
