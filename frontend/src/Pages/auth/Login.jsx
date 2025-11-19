import React, { useState }from 'react'
import './auth.css';
import { assets} from '../../assets/assets'
import { Link, useNavigate } from "react-router-dom";
import { UserData } from '../../context/UserContext';
import { CourseData } from '../../context/CourseContext';
import { BiHide,BiShowAlt } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const{ btnLoading, loginUser} = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const { fetchMyCourse } = CourseData();

  const submitHandler = async(e)=>{
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  }

  return (
    <section className="sign-in">
      <div className="contain">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img src={assets.signin} alt="sign in" />
            </figure>
            <Link to="/register" className="signup-image-link">
              Create an account
            </Link>
          </div>

          <div className="signin-form">
            <h2 className="form-title">Login</h2>
            <form onSubmit={submitHandler} className="register-form">
            <div className="form-group">
              <div style={{ display: "flex", alignItems: "center" }}>
               <MdOutlineEmail style={{ position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize:"20px" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="Enter your Email"
                  required
                />
              </div>
            </div>
            <div className="form-group" style={{ position: "relative" }}>
              <FiLock
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "20px",
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              {password && (
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "20px"
                  }}
                >
                  {showPassword ? <BiHide /> : <BiShowAlt />}
                </span>
              )}
          </div>
          <div className="form-group form-button">
            <button disabled={btnLoading} type="submit" className="form-submit" >
              {btnLoading ? "Please wait..." : "Login"}
            </button>
          </div>
        </form>
        <p>
          Forgot your password?{" "}
          <Link to="/forgot-password">Click!</Link>
        </p>
      </div>
    </div>
  </div>
</section>
  );
};

export default Login
