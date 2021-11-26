// @mui/material
import Box from "@mui/material/Box";

const HeaderToolbar = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: (theme) => theme.spacing(0, 2),
        minHeight: (theme) => theme.mixins.toolbar.minHeight,
      }}
    >
      {children}
    </Box>
  );
};

export default HeaderToolbar;
