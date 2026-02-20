"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>("");

  // Load tema dari localStorage jika ada
  useEffect(() => {
    // const savedTheme = localStorage.getItem("theme");
    const savedTheme = "light";
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Simpan tema ke localStorage setiap kali tema berubah
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    // setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setTheme((prevTheme) => (prevTheme === "light" ? "light" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

// Custom hook untuk menggunakan ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
