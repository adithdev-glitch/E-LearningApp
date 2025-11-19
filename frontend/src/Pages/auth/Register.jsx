import React, { useState } from "react";
import "./auth.css";
import { assets} from '../../assets/assets'
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { FiUser,FiLock } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { BiHide,BiShowAlt } from "react-icons/bi";


const Register = () => {
  const navigate = useNavigate();
  const{ btnLoading, registerUser} = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return false;
  
    const domain = email.split("@")[1];
    return allowedDomains.includes(domain.toLowerCase());
  };

  const isValidPassword = (password) => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);

  const isFormValid = isValidEmail(email) && isValidPassword(password);
  

  const submitHandler = async(e)=>{
    e.preventDefault();
    await registerUser(name, email, password, navigate);
  }
  return (
    <section className="signup">
    <div className="contain">
      <div className="signup-content">
        <div className="signup-form">
          <h2 className="form-title">Sign Up</h2>
          <form onSubmit={submitHandler} className="register-form">
            <div className="form-group">
              <div style={{ display: "flex", alignItems: "center" }}>
                <FiUser style={{ position: "absolute",
                   top: "50%",
                   transform: "translateY(-50%)",
                   cursor: "pointer",
                   fontSize:"20px" }}
                />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: "flex", alignItems: "center" }}>
                <MdOutlineEmail style={{ position: "absolute",
                     top: "50%",
                     transform: "translateY(-50%)",
                     cursor: "pointer",
                     fontSize:"20px" }}
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
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
                onBlur={() => setPasswordTouched(true)}
                placeholder="Enter Password"
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
                    fontSize: "20px",
                  }}
                >
                  {showPassword ? <BiHide /> : <BiShowAlt />}
                </span>
              )}
              
            </div>

            <div className="form-group">
              {emailTouched && !isValidEmail(email) && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Please enter a valid email address.
                </p>
              )}
              {passwordTouched && !isValidPassword(password) && (
              <p style={{ color: "red", fontSize: "14px" }}>
                Password must be at least 8 characters, include uppercase, lowercase, number, and special character.
              </p>
              )}
            </div>

            <div className="form-group form-button">
              <button disabled={btnLoading || !isFormValid}  type="submit" className="form-submit">{btnLoading? "Please wait..." : "Register"}
              </button>
            </div>
          </form>
        </div>

        <div className="signup-image">
          <figure>
            <img src={assets.signup} alt="Sign up" />
          </figure>
          <Link to="/login" className="signup-image-link">
            I am already a member
          </Link>
        </div>
      </div>
    </div>
  </section>

  );
};

export default Register;
