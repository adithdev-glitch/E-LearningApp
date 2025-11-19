import React from 'react'
import "./courses.css"
import { CourseData } from '../../context/CourseContext'
import CourseCard from '../../components/courseCard/CourseCard';
import FeedbackForm from '../../components/feedback/FeedbackPage';


const Courses = () => {
  const { courses } = CourseData();
  console.log(courses);
  
  return (
    <>
    <div className="page-title" data-aos="fade">
      <div className="heading">
        <div className="container">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-lg-8">
              <h1>Courses</h1>
              <p className="mb-0">
              Explore our diverse range of courses designed to help you excel in various fields. From technology to business, our expert-led programs cater to all skill levels and learning preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
      <nav className="breadcrumbs">
        <div className="container">
          <ol>
            <li><a href="/">Home</a></li>
            <li className="current">Courses</li>
          </ol>
        </div>
      </nav>
    </div>
    <section id="courses" className="courses section">
    <div className="container section-title">
        <h2>Courses</h2>
        <p>Popular Courses</p>
      <div className="course-container">
    
          {courses && courses.length > 0 ? (
            courses.map((e) => <CourseCard key={e._id} course={e} />)
          ) : (
            <p>No Courses Yet!</p>
          )}

      </div>
      {/* <FeedbackForm /> */}
    </div>
    </section>
    
    </>
  );
}

export default Courses
