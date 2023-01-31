import React, { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  fullScreen: boolean;
  setFullScreen: (fullScreen: boolean) => void
}

const FullScreenWrapper: React.FC<Props> = ({ children, fullScreen, setFullScreen }) => {


  useEffect(() => {
    if (fullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [fullScreen]);

  return (
    <div className="full-screen-wrapper">

      {children}
    </div>
  );
};

export default FullScreenWrapper;