// @mui/material
import CssBaseLine from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";

// @next

// @src/contexts
import { PalleteProvider, usePallete } from "../contexts/PalleteContext";

// @src/theme
import theme from "../theme";

// @src/components
import PageLoadingBar from "../components/progress/PageLoadingBar";

const AppliedThemeLayout = ({ children }) => {
  const { mode } = usePallete();

  return (
    <ThemeProvider theme={theme(mode)}>
      <CssBaseLine />
      <PageLoadingBar />
      {children}
    </ThemeProvider>
  );
};

const ThemeLayout = ({ children }) => (
  <PalleteProvider>
    <AppliedThemeLayout>{children}</AppliedThemeLayout>
  </PalleteProvider>
);

export default ThemeLayout;
