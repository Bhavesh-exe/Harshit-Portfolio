import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Memories from "./Memories";
import setSplitText from "./utils/splitText";
import useLenis from "../hooks/useLenis";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useLenis();

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <Landing>{!isDesktopView && children}</Landing>
      <About />
      <WhatIDo />
      <Memories />
      {isDesktopView && (
        <Suspense fallback={<div>Loading....</div>}>
          <TechStack />
        </Suspense>
      )}
      <Contact />
    </div>
  );
};

export default MainContainer;
