import React, { createContext, useState } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [userInput, setUserInput] = useState("");
  const [category, setCategory] = useState("");
  const [selectedBenefit, setSelectedBenefit] = useState(null);

  const value = {
    userInput,
    setUserInput,
    category,
    setCategory,
    selectedBenefit,
    setSelectedBenefit,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
