import React, { useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const FullScreenWrapper: React.FC<Props> = ({ children }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [isFullScreen]);

  return (
    <div className="full-screen-wrapper">
      <button onClick={() => setIsFullScreen(!isFullScreen)}>Toggle Full Screen</button>
      {children}
    </div>
  );
};

export default FullScreenWrapper;