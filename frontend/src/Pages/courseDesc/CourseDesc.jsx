import React, { useEffect, useState } from 'react'
import "../courses/courses.css";
import { assets } from '../../assets/assets';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserData } from '../../context/UserContext';
import Loading from '../../components/loading/Loading';

const CourseDesc = ({user}) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();

  const { fetchCourse, course, fetchCourses, fetchMyCourse} = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );

    const options = {
      key: "rzp_test_poYEepsrFEzetS", // Enter the Key ID generated from the Dashboard
      amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "E learning", //your business name
      description: "Learn with us",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            }
          );

          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          console.log(error);
          setLoading(false);
        }
      },
      theme: {
        color: "#8a4baf",
      },
    };
    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };
  
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTabIndex((prevIndex) => (prevIndex + 1) % tabsData.length);
    }, 3000);
  
    return () => clearInterval(interval);
  }, []);
  

      const tabsData = [
        {
          title: "Modern Architecture",
          heading: "Innovations in Modern Architecture",
          subtext:
            "Exploring the latest trends and advancements in modern architectural design.",
          content:
            "Discover the cutting-edge techniques used in contemporary architecture to create sustainable and visually stunning buildings.",
          image: assets.tab_1,
        },
        {
          title: "Engineering Wonders",
          heading: "The Marvels of Engineering",
          subtext:
            "A deep dive into the greatest engineering achievements of our time.",
          content:
            "From bridges to skyscrapers, learn how engineers overcome challenges to build incredible structures.",
          image: assets.tab_2,
        },
        {
          title: "Sustainable Design",
          heading: "Eco-Friendly and Green Buildings",
          subtext:
            "How sustainability is shaping the future of construction and urban planning.",
          content:
            "Understand the materials and methods that contribute to environmentally responsible architecture.",
          image: assets.tab_3,
        },
        {
          title: "Historical Structures",
          heading: "Preserving the Past",
          subtext: "A journey through historical landmarks and their restoration processes.",
          content:
            "Learn about the efforts to maintain and restore historical structures around the world.",
          image: assets.tab_4,
        },
        {
          title: "Future Cities",
          heading: "Smart Cities and the Future of Urban Living",
          subtext: "How technology is shaping the cities of tomorrow.",
          content:
            "Explore how smart infrastructure and AI are transforming the way we live and work in urban environments.",
          image: assets.tab_5,
        },
      ];


  return (
    <>
    {loading? (
      <Loading />
    ) : (
      <>
     <div className="page-title" data-aos="fade">
      <div className="heading">
        <div className="container">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-lg-8">
              <h1>Course Details</h1>
              <p className="mb-0">
              {course.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <nav className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li className="current">Course Details</li>
          </ol>
        </div>
      </nav>
    </div>
    <section id="courses-course-details" className="courses-course-details section">
  <div className="container" data-aos="fade-up">
    <div className="row">
      {/* Left: Course Image & Info */}
      <div className="col-lg-8 mb-4">
        <img
          src={`${server}/${course.image}`}
          alt={course.title}
          className="img-fluid rounded shadow"
        />
        <h3 className="mt-3">{course.title}</h3>
        <p>{course.description}</p>
      </div>

      {/* Right: Meta Info & Button */}
      <div className="col-lg-4">
        <div className="course-info d-flex justify-content-between align-items-center mb-3">
          <h5>Trainer</h5>
          <p><a href="#" className="text-decoration-none">{course.createdBy}</a></p>
        </div>
        <div className="course-info d-flex justify-content-between align-items-center mb-3">
          <h5>Course Fee</h5>
          <p>₹{course.price}</p>
        </div>
        <div className="course-info d-flex justify-content-between align-items-center mb-4">
          <h5>Duration</h5>
          <p>{course.duration} Weeks</p>
        </div>

        {user && user.subscription.includes(course._id) ? (
          <button
            onClick={() => navigate(`/course/study/${course._id}`)}
            className="start-btn btn btn-success w-100"
          >
            Study
          </button>
        ) : (
          <button onClick={checkoutHandler} className="start-btn btn btn-primary w-100">
            Buy Now
          </button>
        )}
      </div>
    </div>
  </div>
</section>

    <section id="tabs" className="tabs section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">
          <div className="col-lg-3">
            <ul className="nav nav-tabs flex-column" id="myTab" role="tablist">
              {tabsData.map((tab, index) => (
                <li className="nav-item" key={index} role="presentation">
                  <a
  className={`nav-link ${index === activeTabIndex ? "active show" : ""}`}
  data-bs-toggle="tab"
  href={`#tab-${index}`}
  role="tab"
  aria-controls={`tab-${index}`}
  aria-selected={index === activeTabIndex}
>
  {tab.title}
</a>

                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-9 mt-4 mt-lg-0">
            <div className="tab-content" id="myTabContent">
              {tabsData.map((tab, index) => (
                <div
                key={index}
                className={`tab-pane ${index === activeTabIndex ? "active show" : ""}`}
                id={`tab-${index}`}
                role="tabpanel"
                aria-labelledby={`tab-${index}-tab`}
              >
                  <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>{tab.heading}</h3>
                      <p className="fst-italic">{tab.subtext}</p>
                      <p>{tab.content}</p>
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img src={tab.image} alt="" className="img-fluid" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section> 
    </>
    )}
    </>
  )
}

export default CourseDesc
