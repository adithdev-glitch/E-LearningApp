import React, { useEffect } from "react";
import AOS from "aos"; // Import AOS for animations
import "./main.css"
import { assets} from '../../assets/assets'
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper
import { Pagination, Autoplay } from "swiper/modules"; // Swiper modules


const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
    <div className="page-title" data-aos="fade">
      <div className="heading">
        <div className="container">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-lg-8">
              <h1>About Us</h1>
              <p className="mb-0">
              we believe in the power of knowledge and the impact it can have on personal
               and professional growth. Our mission is to bridge the gap between learners 
               and high-quality education by offering 
              interactive courses, expert-led content, and a seamless learning experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <div className="container">
          <ol>
            <li>
              <a href="/">Home</a>
            </li>
            <li className="current">About Us</li>
          </ol>
        </div>
      </nav>
    </div>
      {/* About Us Section */}
      <section id="about-us" className="section about-us">
        <div className="container">
          <div className="row gy-4">
            {/* Image */}
            <div
              className="col-lg-6 order-1 order-lg-2"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img
                src={assets.about}
                className="img-fluid"
                alt="About Us"
              />
            </div>

            {/* Content */}
            <div
              className="col-lg-6 order-2 order-lg-1 content"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3>EONIX is an innovative e-learning platform.</h3>
              <p className="fst-italic">
              To bridge the knowledge gap and foster a culture of lifelong learning, by offering high-quality online
              courses, resources, and tools that cater to diverse learning needs and styles.
              </p>
              <ul>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                  Your future self will thank you for the knowledge you gain today.
                  </span>
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                  Turn curiosity into knowledge and knowledge into success!
                  </span>
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>{" "}
                  <span>
                  Education is not preparation for life; education is life itself.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Testimonials</h2>
          <p>What are they saying</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <Swiper
            loop={true}
            autoplay={{ delay: 5000 }}
            slidesPerView="auto"
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 40 },
              1200: { slidesPerView: 2, spaceBetween: 20 },
            }}
            className="swiper-container"
          >
            {[
              {
                img: assets.test_1,
                name: "Saul Goodman",
                role: "Developer",
                quote:
                  "This platform has transformed the way I learn! The courses are well-structured, and the interactive features keep me engaged. Highly recommended!.",
              },
              {
                img: assets.test_2,
                name: "Sara Wilsson",
                role: "Designer",
                quote:
                  "I love how easy it is to navigate through the website. The lessons are clear, and the quizzes help reinforce my learning. Great job!.",
              },
              {
                img: assets.test_3,
                name: "Jena Karlis",
                role: "Store Owner",
                quote:
                  "Whether you're a beginner or an expert, this platform offers something for everyone. The content is up-to-date and well-explained!.",
              },
              {
                img: assets.test_4,
                name: "Matt Brandon",
                role: "Freelancer",
                quote:
                  "Compared to other e-learning platforms, this one offers excellent courses at a reasonable price. I’ve learned so much already!.",
              },
              {
                img: assets.test_5,
                name: "John Larson",
                role: "Entrepreneur",
                quote:
                  "The support team is responsive, and the discussion forums help me connect with other learners. It feels like a real classroom experience online!.",
              },
            ].map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-wrap">
                  <div className="testimonial-item">
                    <img
                      src={testimonial.img}
                      className="testimonial-img"
                      alt={testimonial.name}
                    />
                    <h3>{testimonial.name}</h3>
                    <h4>{testimonial.role}</h4>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill"></i>
                      ))}
                    </div>
                    <p>
                      <i className="bi bi-quote quote-icon-left"></i>
                      <span>{testimonial.quote}</span>
                      <i className="bi bi-quote quote-icon-right"></i>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default About;
