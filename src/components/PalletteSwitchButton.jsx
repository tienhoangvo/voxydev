import { IconButton, Tooltip } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { usePallete } from './../contexts/PalleteContext';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import { useCallback } from 'react';

const PalletteSwitchButton = () => {
  const { mode, toggleMode } = usePallete();

  const renderTitle = useCallback(() => {
    if (mode === 'light') return 'Turn off the light';

    return 'Turn on the light';
  }, [mode]);

  return (
    <Tooltip title={renderTitle()}>
      <IconButton onClick={toggleMode} size="small">
        {mode === 'dark' && <LightModeOutlinedIcon />}
        {mode === 'light' && <NightlightOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default PalletteSwitchButton;
