import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer" className="footer position-relative light-background">
      <div className="container footer-top">
        <div className="row gy-4">
          {/* About Section */}
          <div className="col-lg-4 col-md-6 footer-about">
              <span className="sitename">Eonix</span>
            <div className="footer-contact pt-3">
              <p>A108 Adam Street</p>
              <p>New York, NY 535022</p>
              <p className="mt-3">
                <strong>Phone:</strong> <span>+91 7560876713</span>
              </p>
              <p>
                <strong>Email:</strong> <span>adithadhivr46@gmail.com</span>
              </p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com/adi.hh_?igsh=MXE5czd1Z2k1d3V2ZA=="><i className="bi bi-instagram"></i></a>
              <a href="https://www.linkedin.com/in/adithtp?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About us</a></li>
              <li><a href="/courses">Services</a></li>
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><a href="/courses">Web Design</a></li>
              <li><a href="/courses">Web Development</a></li>
              <li><a href="/courses">Product Management</a></li>
              <li><a href="/courses">Marketing</a></li>
              <li><a href="/courses">Graphic Design</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>Our Newsletter</h4>
            <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
            <form action="forms/newsletter.php" method="post" className="php-email-form">
              <div className="newsletter-form">
                <input type="email" name="email" placeholder="Enter your email" required />
                <input type="submit" value="Subscribe" />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container copyright text-center mt-4">
        <p>
          © <span>Copyright</span> <strong className="px-1">Eonix</strong> <span>All Rights Reserved</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
