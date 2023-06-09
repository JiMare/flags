import React, { useState } from "react";
import { createContext, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "dark"
      ? {
          background: {
            default: "#202C36",
            paper: "#2B3844",
          },
        }
      : {
          background: {
            default: "#fff",
          },
        }),
    text: {
      ...(mode === "light"
        ? {
            primary: "#111517",
          }
        : {
            primary: "#fff",
          }),
    },
  },
});

type ContextType = {
  onChange: () => void;
};

const ThemeContext = createContext<ContextType | null>(null);
export const useThemeContext = () => useContext(ThemeContext);

type Props = {
  children: React.ReactNode;
};

export const MuiThemeProvider: React.FC<Props> = ({ children }) => {
  const localTheme = localStorage.getItem("theme");

  const [muiMode, setMuiMode] = useState(localTheme ?? "light");

  const muiTheme = createTheme(getDesignTokens(muiMode as PaletteMode));

  const onChangeMuiTheme = () => {
    if (muiMode === "dark") {
      setMuiMode("light");
    } else {
      setMuiMode("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ onChange: onChangeMuiTheme }}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
