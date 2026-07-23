import React from "react";
import { FaCompass, FaUsers, FaFilm, FaArrowRight } from "react-icons/fa6";
import "./styles/WhyWorkWithMe.css";

const WhyWorkWithMeSection: React.FC = () => {
  return (
    <section className="why-work-section" id="why-work-with-me">
      <div className="why-work-section-container">
        <div className="why-work-section-header">
          <div className="why-work-badge">
            <span className="badge-dot"></span>
            PERSPECTIVE & VALUE
          </div>
          <h2 className="why-work-section-title">Why Work With Me</h2>
          <p className="why-work-section-subtitle">
            Delivering reliability, vision, and full accountability on every single project.
          </p>
        </div>

        <div className="why-work-grid">
          {/* Card 1: Solo Travel Expertise */}
          <div className="why-work-card">
            <div className="card-header-flex">
              <div className="icon-wrapper icon-compass">
                <FaCompass />
              </div>
              <span className="card-tag">Independent</span>
            </div>
            <h3 className="card-title">Solo Travel Expertise</h3>
            <p className="card-description">
              I've navigated complex routes alone — no hand-holding needed on location.
            </p>
            <div className="card-footer-note">
              <span>Adaptable under extreme field conditions</span>
            </div>
          </div>

          {/* Card 2: Team Leadership */}
          <div className="why-work-card">
            <div className="card-header-flex">
              <div className="icon-wrapper icon-users">
                <FaUsers />
              </div>
              <span className="card-tag">Leadership</span>
            </div>
            <h3 className="card-title">Team Leadership</h3>
            <p className="card-description">
              I've coordinated shoots with full crews. Your campaign won't fall apart on day one.
            </p>
            <div className="card-footer-note">
              <span>Flawless crew synchronization</span>
            </div>
          </div>

          {/* Card 3: End-to-End Production */}
          <div className="why-work-card card-full-width">
            <div className="card-header-flex">
              <div className="icon-wrapper icon-film">
                <FaFilm />
              </div>
              <span className="card-tag">Full Lifecycle</span>
            </div>
            <h3 className="card-title">End-to-End Production</h3>

            {/* Pipeline Visual */}
            <div className="pipeline-container">
              <div className="pipeline-step">
                <span className="step-number">01</span>
                <span className="step-label">Concept</span>
              </div>
              <div className="pipeline-arrow">
                <FaArrowRight />
              </div>
              <div className="pipeline-step">
                <span className="step-number">02</span>
                <span className="step-label">Shoot</span>
              </div>
              <div className="pipeline-arrow">
                <FaArrowRight />
              </div>
              <div className="pipeline-step">
                <span className="step-number">03</span>
                <span className="step-label">Edit</span>
              </div>
              <div className="pipeline-arrow">
                <FaArrowRight />
              </div>
              <div className="pipeline-step step-highlight">
                <span className="step-number">04</span>
                <span className="step-label">Delivery</span>
              </div>
            </div>

            <p className="card-description">
              Concept → shoot → edit → delivery. One person, full accountability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithMeSection;
