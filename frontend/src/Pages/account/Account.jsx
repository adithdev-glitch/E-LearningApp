import React from 'react'
import "./Account.css"
import { MdDashboard } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Account = ({user}) => {
  const {setIsAuth, setUser} = UserData();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  }
  return (<>
  {user && (
    <div className="page-content page-container" id="page-content">
    <div className="padding">
      <div className="row container d-flex justify-content-center">
        <div className="col-xl-6 col-md-12">
          <div className="card user-card-full">
            <div className="row m-l-0 m-r-0">
              {/* User Image & Details */}
              <div className="col-sm-4 bg-c-lite-green user-profile">
                <div className="card-block text-center text-white">
                  <div className="m-b-25">
                    <img
                      src="https://img.icons8.com/bubbles/100/000000/user.png"
                      className="img-radius"
                      alt="User Profile"
                    />
                  </div>
                  <h6 className="f-w-600">{user.name}</h6>
                  <p>{user.role}</p>
                </div>
              </div>

              {/* User Info */}
              <div className="col-sm-8">
                <div className="card-block">
                  <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                  <div className="row">
                    <div className="col-sm-6">
                      <p className="m-b-10 f-w-600">Email</p>
                      <h6 className="text-muted f-w-400">{user.email}</h6>
                    </div>
                  </div>

                  {/* Social Links */}
                  <ul className="social-link list-unstyled m-t-40 m-b-10">
                    <li>
                      <a href="#!" title="Facebook">
                        <i className="bi bi-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#!" title="Twitter">
                        <i className="bi bi-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#!" title="Instagram">
                        <i className="bi bi-instagram"></i>
                      </a>
                    </li>
                  </ul>
                  {
                    user.role === "user" && (
                      <button className='ad_btn' onClick={()=>navigate(`/${user._id}/dashboard`)} ><MdDashboard /> Dashboard</button>
                    )
                  }
                  {
                    user.role === "admin" && user.mainrole === "user" &&(
                      <button className='ad_btn' onClick={()=>navigate(`/admin/course`)} ><MdDashboard />Dashboard</button>
                    )
                  }
                  {
                    user.mainrole === "superadmin" && (
                      <button className='ad_btn' onClick={()=>navigate(`/admin/dashboard`)} ><MdDashboard />Admin Dashboard</button>
                    )
                  }
                  <button onClick={logoutHandler} className='logout'><AiOutlineLogout /> Logout</button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )}
    </>
  )
}

export default Account
