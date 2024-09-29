import React, { createContext, useState, useContext } from "react";

// Create context
const MoodContext = createContext();

// Custom hook to use the MoodContext
export const useMood = () => useContext(MoodContext);

// MoodProvider to wrap your app and provide global mood state
export const MoodProvider = ({ children }) => {
  const [userMood, setUserMood] = useState("");

  return (
    <MoodContext.Provider value={{ userMood, setUserMood }}>
      {children}
    </MoodContext.Provider>
  );
};
