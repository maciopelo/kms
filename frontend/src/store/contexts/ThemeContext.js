import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty("--beige", darkTheme ? "#3e3c3d" : "#fef8e5");
    root?.style.setProperty("--rouge", darkTheme ? "#ba6268" : "#a65358");
    root?.style.setProperty("--lightRouge", darkTheme ? "#d1968f" : "#e6a9a2");
    root?.style.setProperty("--lightBlue", darkTheme ? "#9eabb3" : "#cedde5");
    root?.style.setProperty("--gray", darkTheme ? "#fef8e5" : "#3e3c3d");
    root?.style.setProperty("--bgImageOpacity", darkTheme ? "0.5" : "1");
    root?.style.setProperty(
      "--shadow",
      darkTheme ? "rgba(216, 210, 213, 0.7)" : "rgba(62, 60, 61, 0.7)"
    );
    root?.style.setProperty(
      "--defaultShadowBox",
      darkTheme
        ? "0 0 8px 2px rgba(216, 210, 213, 0.7)"
        : " 0 0 8px 2px rgba(62, 60, 61, 0.7)"
    );
  }, [darkTheme]);

  return (
    <ThemeContext.Provider
      value={{
        toggleTheme: () => setDarkTheme((prev) => !prev),
        darkTheme: darkTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
