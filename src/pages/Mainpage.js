import React from 'react';
import { useRef,useState,useEffect } from 'react';
import Naruto from "../assets/Makinganime.mp4"
const Sevenvideo = () => {
  const videoRef = useRef(null);

  // Object for storing mutable values
  const playCountRef = useRef({ count: 0 });
  const [lastTapTime, setLastTapTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);  // Define intervalId in the state

  // Handle the play event
  const handlePlay = () => {
    playCountRef.current.count += 1;
    console.log('Video is now playing. Play count:', playCountRef.current.count);
  };

  // Handle double-click events
  const handleDoubleClick = (e) => {
    e.preventDefault();
    console.log('Double-click detected, preventing fullscreen.');
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error("Failed to exit fullscreen mode:", err);
      });
    }

    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    const middleX = left + width / 2;

    if (clientX < middleX) {
      // Double-click on the left side
      if (videoRef.current) {
        videoRef.current.currentTime -= 5;  // Move 5 seconds backward
        console.log('Rewound video by 5 seconds.');
      } else {
        console.error('Video reference is not available.');
      }
    } else {
      // Double-click on the right side
      if (videoRef.current) {
        videoRef.current.currentTime += 10;  // Move 10 seconds forward
        console.log('Fast-forwarded video by 10 seconds.');
      } else {
        console.error('Video reference is not available.');
      }
    }
  };

  // Handle mouse down events
  const handleMouseDown = (event) => {
    const { clientX, currentTarget } = event;
    const { left, width } = currentTarget.getBoundingClientRect();
    const middleX = left + width / 2;

    if (clientX < middleX) {
      // Press and hold on the left side
      const id = setInterval(() => {
        if (videoRef.current) {
          videoRef.current.currentTime -= 0.5;  // Move backward every 0.5 seconds at 3x speed
        }
      }, 500);
      setIntervalId(id);
      showNotification('Rewinding at 3x speed');
    } else {
      // Press and hold on the right side
      const id = setInterval(() => {
        if (videoRef.current) {
          videoRef.current.currentTime += 1;  // Move forward every 0.5 seconds at 2x speed
        }
      }, 500);
      setIntervalId(id);
      showNotification('Fast-forwarding at 2x speed');
    }
  };

  // Handle mouse up events
  const handleMouseUp = () => {
    // Clear the interval when the mouse button is released
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // Show a notification (or tooltip) on the video player
  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'absolute';
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.padding = '10px';
    notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.fontSize = '14px';
    notification.style.zIndex = 1000;
    videoRef.current.parentElement.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 1500);  // Remove notification after 1.5 seconds
  };

  // Handle the context menu event to prevent right-click context menu
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
    <div>
      <p>Seventh video</p>
      <video
        src={Naruto}
        ref={videoRef}
        onPlay={handlePlay}
       // onMouseDown={handleMouseDown}  // Add mouse down handler for press-and-hold detection
       // onMouseUp={handleMouseUpForDoubleTap}  // Add mouse up handler to stop press-and-hold actions
        onDoubleClick={handleDoubleClick}  // Handle double-click events for the video
        onContextMenu={handleContextMenu}  // Prevent fullscreen through context menu
        controls
        width="640"
        height="360"
      />
      <button onClick={playVideo}>Play</button>
      <button onClick={pauseVideo}>Pause</button>
    </div>
  );
};

export default Sevenvideo;
