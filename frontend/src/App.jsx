import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import Home from "./Pages/home/Home";
import Header from "./components/header/Header";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Verify from "./Pages/auth/Verify";
import Footer from "./components/footer/Footer";
import About from "./Pages/about/About";
import Account from "./Pages/account/Account";
import { UserData } from "./context/UserContext";
import Loading from "./components/loading/Loading"
import Courses from "./Pages/courses/Courses";
import CourseDesc from "./Pages/courseDesc/CourseDesc";
import PaymentSuccess from "./Pages/paymentsuccess/PaymentSuccess";
import Dashboard from "./Pages/dashboard/Dashboard";
import CourseStudy from "./Pages/coursestudy/CourseStudy";
import Lecture from "./Pages/lecture/Lecture";
import AdminDashboard from "./admin/Dashboard/AdminDashboard";
import AdminCourses from "./admin/Course/AdminCourses";
import AdminUsers from "./admin/Users/AdminUsers";
import Contact from "./Pages/contact/contact";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import ResetPassword from "./Pages/auth/ResetPassword";
import FeedbackPage from "./components/feedback/FeedbackPage";
import AdminFeedback from "./admin/Feedback/AdminFeedback";
import Order from "./admin/Orders/Order";


function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  const {isAuth, user, loading} = UserData()

  return (<Router>
    {loading ? (
      <Loading />
    ) : (
      <>
        <Header isAuth={isAuth} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={isAuth ? <Account user={user} /> : <Login />} />
          <Route path="/login" element={isAuth ? <Home /> : <Login />} />
          <Route path="/register" element={isAuth ? <Home /> : <Register />} />
          <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
          <Route path="/forgot-password" element={isAuth ? <Home /> : <ForgotPassword />} />
          <Route path="/reset-password/:token" element={isAuth ? <Home /> : <ResetPassword />} />
          <Route path="/course/:id" element={isAuth ? <CourseDesc user={user} /> : <Login />} />
          <Route path="/payment-success/:id" element={isAuth ? <PaymentSuccess user={user} /> : <Login />} />
          <Route path="/:id/dashboard" element={isAuth ? <Dashboard user={user} /> : <Login />} />
          <Route path="/course/study/:id" element={isAuth ? <CourseStudy user={user} /> : <Login />} />
          <Route path="/lectures/:id" element={isAuth ? <Lecture user={user} /> : <Login />} />
          <Route path="/admin/dashboard" element={isAuth ? <AdminDashboard user={user} /> : <Login />} />
          <Route path="/admin/course" element={isAuth ? <AdminCourses user={user} /> : <Login />} />
          <Route path="/admin/users" element={isAuth ? <AdminUsers user={user} /> : <Login />} />
          <Route path="/feedback" element={isAuth ? <FeedbackPage user={user} /> : <Login />} />
          <Route path="/admin/feedbacks" element={isAuth ? <AdminFeedback user={user} /> : <Login />} />
          <Route path="/admin/orders" element={isAuth ? <Order user={user} /> : <Login />} />

        </Routes>
        <Footer />
      </>
    )}
  </Router>
);
}

export default App;
