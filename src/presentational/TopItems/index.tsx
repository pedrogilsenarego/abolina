import { useEffect, useState } from "react";
import Menu from "./Menu";
import TopBar from "./TopBar";

import { useMediaQuery, useTheme } from "@mui/material";

const TopItems = () => {
  const [navbarVisible, setNavbarVisible] = useState<boolean>(true);
  const Theme = useTheme();

  const mobile = useMediaQuery(Theme.breakpoints.down("md"));

  useEffect(() => {
    let previousScrollPosition = window.pageYOffset;
    const handleScroll = () => {
      let currentScrollPosition = window.pageYOffset;
      if (currentScrollPosition > previousScrollPosition) {
        if (currentScrollPosition < (mobile ? 80 : 120)) {
          setNavbarVisible(true);
        } else {
          setNavbarVisible(false);
        }
      } else {
        setNavbarVisible(true);
      }
      previousScrollPosition = currentScrollPosition;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        transition: "transform 0.5s ease-in-out",
        transform: navbarVisible ? "translateY(0%)" : "translateY(-100%)",
        zIndex: mobile ? 2000 : 1000,
        backgroundColor: "white",
      }}
    >
      <TopBar />
      <Menu />
    </div>
  );
};

export default TopItems;
