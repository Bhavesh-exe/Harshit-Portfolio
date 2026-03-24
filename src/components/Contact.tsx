import { MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:harshitsoni3103@gmail.com" data-cursor="disable">
                harshitsoni3103@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>MBA</p>
          </div>
          
          <div className="contact-box text-right items-end">
            <h2>
              Designed and Developed <br /> by <span>Harshit Soni</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
