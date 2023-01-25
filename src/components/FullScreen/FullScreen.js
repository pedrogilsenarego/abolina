import React, { useRef, useEffect } from "react";
import useFullscreenStatus from "../../hooks/useFullScreenStatus";
import { useKeyPress } from "../../hooks/useKeyPress";

export default function Fullscreen({
  children,
  backgroundColor = "darkgrey",
  openFullScreen,
  setOpenFullScreen,
}) {
  const maximizeElement = useRef(null);
  const escButton = useKeyPress("Esc");
  let isFullscreen, setIsFullscreen;
  let errorMessage;

  try {
    [isFullscreen, setIsFullscreen] = useFullscreenStatus(maximizeElement);
  } catch (e) {
    errorMessage = "Fullscreen not supported";
    isFullscreen = false;
    setIsFullscreen = undefined;
  }

  useEffect(() => {
    if (escButton) {
      setOpenFullScreen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escButton]);

  useEffect(() => {
    if (openFullScreen) {
      setIsFullscreen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openFullScreen]);

  const handleExitFullscreen = () => {
    setOpenFullScreen(false);
    document.exitFullscreen();
  };

  return (
    <div
      ref={maximizeElement}
      style={{ backgroundColor: isFullscreen ? backgroundColor : null }}
    >
      <div>{children}</div>
      {errorMessage ? (
        <button
          className='btn'
          onClick={() =>
            alert(
              "Fullscreen is unsupported by this browser, please try another browser."
            )
          }
        >
          {errorMessage}
        </button>
      ) : isFullscreen ? (
        <div className='row'>
          <button
            style={{ marginLeft: "40em", marginTop: "-3em", color: "black" }}
            className='paper-btn btn-primary text-black'
            onClick={handleExitFullscreen}
          >
            Exit
          </button>
        </div>
      ) : (
        []
      )}
    </div>
  );
}
