import Fab from "@mui/material/Fab";

import PreviewIcon from "@mui/icons-material/Preview";

import Link from "./../components/Link";

const PreviewActionButton = () => {
  return (
    <Fab
      sx={{
        position: "absolute",
        top: 2,
        right: 2,
        color: "inherit",
      }}
      component={Link}
      href={"/api/exit-preview"}
    >
      <PreviewIcon />
    </Fab>
  );
};

export default PreviewActionButton;
