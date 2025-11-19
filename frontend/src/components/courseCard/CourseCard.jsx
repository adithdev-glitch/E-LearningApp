import React from 'react'
import { server } from '../../main'
import "../../Pages/courses/courses.css"
import { UserData } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { CourseData } from '../../context/CourseContext'
import { assets } from '../../assets/assets'

const CourseCard = ({course}) => {
  const navigate = useNavigate();
  const {user, isAuth} = UserData();

  const {fetchCourses} = CourseData();

  const deleteHandler = async(id) => {
    if(confirm("Are you sure you want to delete this course")){
      try {
        const {data} = await axios.delete(`${server}/api/course/${id}`,{
          headers:{
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  };
  return (
    <section id="courses" className="courses section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="course-item-1">
              <img src={`${server}/${course.image}`} className="img-fluid-1"/>
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="category">{course.category}</p>
                    <p className="price">₹{course.price}</p>
                  </div>
                  <h3><a href="#">{course.title}</a></h3>
                  <p className="description">{course.description}</p>
                  <p className="description">Duration {course.duration} weeks</p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-profile d-flex align-items-center">
                      <img src={assets.admin_1} className="img-fluid" />
                      <a href="#" className="trainer-link">{course.createdBy}</a>
                    </div>
                    <div className="trainer-rank d-flex align-items-center">
                      {isAuth ? (
                        <>
                          {user && user.role !== "admin" ? (
                            <>
                              {user.subscription.includes(course._id) ? (
                                <button onClick={() => navigate(`/course/study/${course._id}`)} className="start-btn">
                                  Study
                                </button>
                          ) : (
                                <button onClick={() => navigate(`/course/${course._id}`)} className="start-btn">
                                  Get Started
                                </button>
                              )}
                            </>
                          ) : (
                            <button onClick={() => navigate(`/course/study/${course._id}`)} className="start-btn">
                              Study
                            </button>
                          )}
                        </>
                      ) : (
                      <button onClick={() => navigate("/login")} className="start-btn">
                        Get Started
                      </button>
                      )}   
                      {user && (user.mainrole === "superadmin" || course.owner === user._id) && (
                    <button
                      onClick={() => deleteHandler(course._id)}
                      className="start-btn"
                      style={{ background: "red", marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
    
  )
}

export default CourseCard

   