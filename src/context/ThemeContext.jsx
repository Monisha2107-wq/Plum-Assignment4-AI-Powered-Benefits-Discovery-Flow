import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const themeConfig = {
  light: {
    primary: "#111827",
    secondary: "#6b7280",
    background: "#ffffff",
    surface: "#f9fafb",
    border: "#e5e7eb",
    accent: "#3b82f6",
    error: "#dc2626",
    success: "#10b981",
    card: "#ffffff",
    text: "#111827",
    textSecondary: "#6b7280",
    shadow: "rgba(0, 0, 0, 0.05)",
  },
  dark: {
    primary: "#f9fafb",
    secondary: "#d1d5db",
    background: "#111827",
    surface: "#1f2937",
    border: "#374151",
    accent: "#60a5fa",
    error: "#f87171",
    success: "#34d399",
    card: "#1f2937",
    text: "#f9fafb",
    textSecondary: "#d1d5db",
    shadow: "rgba(0, 0, 0, 0.3)",
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("health-benifiter-theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
      setIsDarkMode(savedTheme === "dark");
    } else if (systemPrefersDark) {
      setTheme("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setIsDarkMode(newTheme === "dark");
    localStorage.setItem("health-benifiter-theme", newTheme);
  };

  const setThemeMode = (newTheme) => {
    if (newTheme === "light" || newTheme === "dark") {
      setTheme(newTheme);
      setIsDarkMode(newTheme === "dark");
      localStorage.setItem("health-benifiter-theme", newTheme);
    }
  };

  const themeColors = themeConfig[theme];

  const value = {
    theme,
    setTheme: setThemeMode,
    isDarkMode,
    toggleTheme,
    themeColors,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
