import { createContext, useState, useEffect } from 'react';

export const VideoFeedContext = createContext();

export const VideoFeedProvider = ({ children }) => {
  const [isVideoFeedOnline, setIsVideoFeedOnline] = useState(false);

  const checkOnlineStatus = async () => {
    // console.log('Checking online status...');
    try {
      const response = await fetch(
        'http://195.148.104.124:1935/jakelu/jakfilms/manifest.mpd'
      );
      // console.log('Response:', response);
      setIsVideoFeedOnline(response.ok);
    } catch (error) {
      console.error('Error:', error);
      setIsVideoFeedOnline(false);
    }
  };

  useEffect(() => {
    checkOnlineStatus();
  }, []);

  return (
    <VideoFeedContext.Provider
      value={{ isVideoFeedOnline, setIsVideoFeedOnline }}
    >
      {children}
    </VideoFeedContext.Provider>
  );
};
