import React, { useEffect, useRef } from 'react';

import Wafflecone from '../assets/Waffle cone.mp4'

const Player= () => {
  // Standard DOM reference with initial value `null`
  const videoRef = useRef(null);

  // Object for storing mutable values
  const playCountRef = useRef({ count: 0 });

  // Handle the play event
  const handlePlay = () => {
    playCountRef.current.count += 1;
    console.log('Video is now playing. Play count:', playCountRef.current.count);
  };

  // Prevent fullscreen mode on double-click
  const handleDoubleClick = (e) => {
    e.preventDefault();
    console.log('Double-click detected, preventing fullscreen.');
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error("Failed to exit fullscreen mode:", err);
      });
    }
  };

  // Prevent fullscreen mode via context menu (right-click)
  const handleContextMenu = (e) => {
    e.preventDefault();
    console.log('Right-click detected.');
  };

  // Handle fullscreen change event to prevent fullscreen mode
  const handleFullscreenChange = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error("Failed to exit fullscreen mode:", err);
      });
    }
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <>
      <video
        id="video-element"
        className="video-player"
        src={Wafflecone}
        ref={videoRef}  // Attach the ref to the video element
        onPlay={handlePlay}
        onDoubleClick={handleDoubleClick}  // Prevent fullscreen on double-click
        onContextMenu={handleContextMenu}  // Prevent fullscreen through context menu
      />
      <button onClick={playVideo}>Play</button>
      <button onClick={pauseVideo}>Pause</button>
    </>
  );
};

export default Player;
