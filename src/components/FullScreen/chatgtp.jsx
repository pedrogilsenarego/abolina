import React, { useEffect } from "react";

// interface Props {
//   children: React.ReactNode;
//   fullScreen: boolean;
//   setFullScreen: (fullScreen: boolean) => void
// }

const FullScreenWrapper = ({ children, fullScreen, setFullScreen }) => {
  useEffect(() => {
    if (fullScreen) {
      document.documentElement.requestFullscreen();

      const exitHandler = () => {
        if (
          !document.webkitIsFullScreen &&
          !document.mozFullScreen &&
          !document.msFullscreenElement
        )
          setFullScreen(false);
      };

      document.addEventListener("webkitfullscreenchange", exitHandler, false);
      document.addEventListener("mozfullscreenchange", exitHandler, false);
      document.addEventListener("fullscreenchange", exitHandler, false);
      document.addEventListener("MSFullscreenChange", exitHandler, false);

      return () => {
        document.removeEventListener(
          "webkitfullscreenchange",
          exitHandler,
          false
        );
        document.removeEventListener("mozfullscreenchange", exitHandler, false);
        document.removeEventListener("fullscreenchange", exitHandler, false);
        document.removeEventListener("MSFullscreenChange", exitHandler, false);
      };
    } else {
      if (fullScreen)
        document.exitFullscreen();
      else return;
    }
  }, [fullScreen, setFullScreen]);

  return <div className='full-screen-wrapper'>{children}</div>;
};

export default FullScreenWrapper;
