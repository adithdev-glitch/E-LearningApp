import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Your message has been sent successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  
  return (
    <div className="page-title" data-aos="fade">
      <div className="heading">
        <div className="container">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-lg-8">
              <h1>Contact</h1>
              <p className="mb-0">Have questions or need assistance? Get in touch with us! We’re here to help and will respond as soon as possible.</p>
            </div>
          </div>
        </div>
      </div>
      <nav className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li className="current">Contact</li>
          </ol>
        </div>
      </nav>
      <section id="contact" className="contact section">
        <div className="mb-5" data-aos="fade-up" data-aos-delay="200">
          <iframe style={{ border: 0, width: "100%", height: "300px" }} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus" frameBorder="0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-4">
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Address</h3>
                  <p>A108 Adam Street, New York, NY 535022</p>
                </div>
              </div>
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                <i className="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Call Us</h3>
                  <p>+91 7560876713</p>
                </div>
              </div>
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email Us</h3>
                  <p>adithadhivr46@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <form method="post" className="php-email-form" data-aos="fade-up" data-aos-delay="200" onSubmit={handleSubmit}>
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                  </div>
                  <div className="col-md-6">
                    <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                  </div>
                  <div className="col-md-12">
                    <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                  </div>
                  <div className="col-md-12">
                    <textarea className="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                  </div>
                  <div className="col-md-12 text-center">
                    <div className="sent-message">Your message has been sent. Thank you!</div>
                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
