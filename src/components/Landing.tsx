import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { Meteors } from "./ui/meteors";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section relative overflow-hidden" id="landingDiv">
        <Meteors number={30} />
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              HARSHIT
              <br />
              <span>SONI</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Creative</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Traveller</div>
              <div className="landing-h2-2">Editor</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Editor</div>
              <div className="landing-h2-info-1">Transitions</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
