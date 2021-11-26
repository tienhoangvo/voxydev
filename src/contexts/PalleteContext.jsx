import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const PalleteContext = createContext();

export const usePallete = () => {
  const context = useContext(PalleteContext);

  if (context === undefined) {
    throw new Error(
      "usePalltete must be used within PalleteProvider component!"
    );
  }

  return context;
};

const getLocalMode = (initialMode = "light") => {
  // Handler serser side rendering
  if (typeof window === "undefined") return initialMode;

  // Client side rendering
  return window.localStorage.getItem("mode") || initialMode;
};

export const PalleteProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleMode = useCallback(() => {
    const newMode = mode === "light" ? "dark" : "light";

    setMode(newMode);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("mode", newMode);
    }
  }, [mode]);

  useEffect(() => {
    const storedMode = getLocalMode();

    setMode(storedMode);
  }, []);

  return (
    <PalleteContext.Provider
      value={{
        mode,
        toggleMode,
      }}
    >
      {children}
    </PalleteContext.Provider>
  );
};
