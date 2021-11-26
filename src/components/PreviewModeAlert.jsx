import Alert from "@mui/material/Alert";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PreviewIcon from "@mui/icons-material/Preview";

const PreviewModeAlert = () => {
  return (
    <Alert
      sx={{ mb: 2 }}
      severity="warning"
      icon={<PreviewIcon />}
      action={
        <Tooltip title="Exit Preview">
          <IconButton
            color="primary"
            component={"a"}
            href={"/api/exit-preview"}
          >
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      }
    >
      This is the preview mode!
    </Alert>
  );
};

export default PreviewModeAlert;
