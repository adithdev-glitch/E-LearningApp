import React, { useEffect } from 'react'
import "./Home.css"
import { assets} from '../../assets/assets'
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom"
import AOS from "aos";
import "aos/dist/aos.css";

// counter
function Counter({ endValue }) {
  const { ref, inView } = useInView({
    triggerOnce: false, // Ensures animation happens only once
    threshold: 0.5, // Starts animation when 50% of the section is in view
  });

  return (
    <div ref={ref}>
      {inView ? <CountUp start={0} end={endValue} duration={1} separator="," /> : 0}
    </div>
  );
}

// features
const featuresData = [
  { icon: "bi-eye", color: "#ffbb2c", title: "Expert" },
  { icon: "bi-infinity", color: "#5578ff", title: "Led Content" },
  { icon: "bi-mortarboard", color: "#e80368", title: "Flexible" },
  { icon: "bi-nut", color: "#e361ff", title: "Self-Paced" },
  { icon: "bi-shuffle", color: "#47aeff", title: "Support" },
  { icon: "bi-star", color: "#ffa76e", title: "Community" },
  { icon: "bi-x-diamond", color: "#11dbcf", title: "Innovative" },
  { icon: "bi-camera-video", color: "#4233ff", title: "Career-focused" },
  { icon: "bi-command", color: "#b2904f", title: "Affordable" },
  { icon: "bi-dribbble", color: "#b20969", title: "Certified" },
  { icon: "bi-activity", color: "#ff5828", title: "Engaging" },
  { icon: "bi-brightness-high", color: "#29cc61", title: "Flexible" }
];

//course
const coursesData = [
  {
    imgSrc: assets.course_1,
    category: "Web Development",
    price: "$169",
    title: "Website Design",
    description: "Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.",
    trainerImg: assets.trainer_1,
    trainerName: "Antonio",
    students: 50,
    likes: 65
  },
  {
    imgSrc: assets.course_2,
    category: "Marketing",
    price: "$250",
    title: "Search Engine Optimization",
    description: "Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.",
    trainerImg: assets.trainer_2,
    trainerName: "Lana",
    students: 35,
    likes: 42
  },
  {
    imgSrc: assets.course_3,
    category: "Content",
    price: "$180",
    title: "Copywriting",
    description: "Et architecto provident deleniti facere repellat nobis iste. Id facere quia quae dolores dolorem tempore.",
    trainerImg: assets.trainer_3,
    trainerName: "Brandon",
    students: 20,
    likes: 85
  }
];

const trainersData = [
  {
    imgSrc: assets.trainer_11,
    name: "Walter",
    specialization: "Web Development",
    description:
      "A web developer turns ideas into reality by crafting seamless, interactive, and dynamic digital experiences.",
  },
  {
    imgSrc: assets.trainer_22,
    name: "Sarah",
    specialization: "App Development",
    description:
      "An app developer transforms ideas into powerful, user-friendly mobile experiences that connect and inspire.",
  },
  {
    imgSrc: assets.trainer_33,
    name: "Anderson",
    specialization: "Game Development",
    description:
      "A game developer brings imagination to life, creating immersive worlds and unforgettable experiences.",
  },
];

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration
      once: false,    // Ensures animation plays every time it's in view
      easing: "ease-in-out",
      offset: 100,    // Adjust this if animations are not triggering
    });
  }, []);
  return (<>
    <section id="hero" className="hero section dark-background">
      <img src={assets.img} className='hero_img' alt="Hero Background" data-aos="fade-in" />

      <div className="container">
        <h2 data-aos="fade-up" data-aos-delay="100">
          Learning Today,<br />Leading Tomorrow
        </h2>
        <p data-aos="fade-up" data-aos-delay="200">
        Online learning is not the next big thing, it is the now big thing.
        </p>
        <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="300">
          <a onClick={() => navigate("/courses")} className="btn-get-started">
            Get Started
          </a>
        </div>
      </div>
    </section>
    <section id="about" className="about section">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-right" data-aos-delay="100">
              <img src={assets.about} className="img-fluid" alt="About Us" />
            </div>
            <div className="col-lg-6 order-2 order-lg-1 content" data-aos="fade-right" data-aos-delay="200">
              <h3>EONIX is an innovative e-learning platform.</h3>
              <p className="fst-italic">
                To bridge the knowledge gap and foster a culture of lifelong learning, by offering high-quality online
                courses, resources, and tools that cater to diverse learning needs and styles.
              </p>
              <ul>
                <li><i className="bi bi-check-circle"></i> Your future self will thank you for the knowledge you gain today.</li>
                <li><i className="bi bi-check-circle"></i> Turn curiosity into knowledge and knowledge into success!</li>
                <li><i className="bi bi-check-circle"></i> Education is not preparation for life; education is life itself.</li>
              </ul>
              <a href="/about" className="read-more">
                <span>Read More</span> <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
  <section id="counts" className="section counts light-background">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {/* Stats Item - Students */}
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <Counter endValue={1232} duration={1} />
              <p>Students</p>
            </div>
          </div>

          {/* Stats Item - Courses */}
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <Counter endValue={64} duration={1} />
              <p>Courses</p>
            </div>
          </div>

          {/* Stats Item - Events */}
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <Counter endValue={42} duration={1} />
              <p>Events</p>
            </div>
          </div>

          {/* Stats Item - Trainers */}
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <Counter endValue={24} duration={1} />
              <p>Trainers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="why-us" className="section why-us">
      <div className="container">
        <div className="row gy-4">
          {/* Left Side: Why Choose Our Products? */}
          <div className="col-lg-4">
            <div className="why-box">
              <h3>Why Us</h3>
              <p>
              At our e-learning platform, we are committed to providing a high-quality, engaging, and flexible learning experience tailored to your needs. Our courses are designed by industry experts, ensuring that you gain practical, real-world skills that boost your career.

              </p>
              <div className="text-center">
                <a href="#" className="more-btn">
                  <span>Learn More</span> <i className="bi bi-chevron-right"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Icon Boxes */}
          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="row gy-4">
              {/* Icon Box 1 */}
              <div className="col-xl-4">
                <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-clipboard-data"></i>
                  <h4>Engaging & Interactive</h4>
                  <p>Live sessions, quizzes, projects, and discussions to enhance learning.</p>
                </div>
              </div>

              {/* Icon Box 2 */}
              <div className="col-xl-4">
                <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-gem"></i>
                  <h4>Affordable & Accessible</h4>
                  <p>Quality education at a price that fits your budget.</p>
                </div>
              </div>

              {/* Icon Box 3 */}
              <div className="col-xl-4">
                <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-inboxes"></i>
                  <h4>Certification & Recognition</h4>
                  <p>Earn industry-recognized certificates to showcase your expertise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="features" className="features section">
      <div className="container">
        <div className="row gy-4">
          {featuresData.map((feature, index) => (
            <div key={index} className="col-lg-3 col-md-4">
              <div className="features-item">
                <i className={`bi ${feature.icon}`} style={{ color: feature.color }}></i>
                <h3><a href="#" className="stretched-link">{feature.title}</a></h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section id="courses" className="courses section">
      <div className="container section-title">
        <h2>Courses</h2>
        <p>Popular Courses</p>
      </div>

      <div className="container">
        <div className="row">
          {coursesData.map((course, index) => (
            <div key={index} className="col-lg-4 col-md-6 d-flex align-items-stretch">
              <div className="course-item">
                <img src={course.imgSrc} className="img-fluid" />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="category">{course.category}</p>
                    <p className="price">{course.price}</p>
                  </div>

                  <h3><a href="#">{course.title}</a></h3>
                  <p className="description">{course.description}</p>

                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-profile d-flex align-items-center">
                      <img src={course.trainerImg} className="img-fluid" />
                      <a href="#" className="trainer-link">{course.trainerName}</a>
                    </div>
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-person user-icon"></i>&nbsp;{course.students}
                      &nbsp;&nbsp;
                      <i className="bi bi-heart heart-icon"></i>&nbsp;{course.likes}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section id="trainers-index" className="section trainers-index">
      <div className="container">
        <div className="row">
          {trainersData.map((trainer, index) => (
            <div key={index} className="col-lg-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
              <div className="member">
                <img src={trainer.imgSrc} className="img-fluid" alt={trainer.name} />
                <div className="member-content">
                  <h4>{trainer.name}</h4>
                  <span>{trainer.specialization}</span>
                  <p>{trainer.description}</p>
                  <div className="social">
                    <a href="#"><i className="bi bi-twitter-x"></i></a>
                    <a href="#"><i className="bi bi-facebook"></i></a>
                    <a href="#"><i className="bi bi-instagram"></i></a>
                    <a href="#"><i className="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    
  </>
  );
};

export default Home
