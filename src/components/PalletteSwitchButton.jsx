import { IconButton, Tooltip } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { usePallete } from './../contexts/PalleteContext';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import { useMemo } from 'react';

const PalletteSwitchButton = () => {
  const { mode, toggleMode } = usePallete();

  const renderTitle = useMemo(() => {
    if (mode === 'light') return 'Turn off the light';

    return 'Turn on the light';
  }, [mode]);

  return (
    <Tooltip title={renderTitle}>
      <IconButton
        sx={{ border: 2, borderColor: 'divider' }}
        onClick={toggleMode}
        size="small"
      >
        {mode === 'dark' && (
          <LightModeOutlinedIcon fontSize="small" />
        )}
        {mode === 'light' && (
          <NightlightOutlinedIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default PalletteSwitchButton;
