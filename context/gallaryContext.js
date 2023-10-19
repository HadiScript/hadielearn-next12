import React from "react";
import { useState, createContext } from "react";

const GallaryContext = createContext();

const GallaryProvider = ({ children }) => {
  const [gallary, setGallary] = useState({
    images: [],
    selected: null,
    showGallaryModal: false,
  });

  return <GallaryContext.Provider value={[gallary, setGallary]}>{children}</GallaryContext.Provider>;
};

export { GallaryContext, GallaryProvider };
