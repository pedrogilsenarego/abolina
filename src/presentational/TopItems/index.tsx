import { useEffect, useState } from "react";
import Menu from "./Menu";
import TopBar from "./TopBar";

const TopItems = () => {
  const [navbarVisible, setNavbarVisible] = useState<boolean>(true);

  useEffect(() => {
    let previousScrollPosition = window.pageYOffset;
    const handleScroll = () => {
      let currentScrollPosition = window.pageYOffset;
      if (currentScrollPosition > previousScrollPosition) {
        setNavbarVisible(false);
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
        zIndex: 3000,
        backgroundColor: "white"
      }}
    >
      <TopBar />
      <Menu />
    </div>
  );
};

export default TopItems;
