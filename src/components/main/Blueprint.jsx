// @react
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';

// @src/components
import Header from './Header';
import Sidenav from './Sidenav';
import TemporarySidenav from './TemporarySidenav';

const Blueprint = () => {
  const [openPernamentSidenav, setOpenPernamentSidenav] =
    useState(false);

  const [openTemporarySidenav, setOpenTemporarySidenav] =
    useState(false);

  const matchedSmDown = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );

  const matchedMdDown = useMediaQuery((theme) =>
    theme.breakpoints.down('md')
  );

  const toggleFullSidenav = () => {
    if (matchedSmDown) {
      setOpenTemporarySidenav((open) => !open);
      return;
    }

    setOpenPernamentSidenav((open) => !open);
  };

  const closeTemporarySidenav = () => {
    setOpenTemporarySidenav(false);
  };

  return (
    <>
      <Header onMenuClick={toggleFullSidenav} />

      {matchedSmDown ? (
        <TemporarySidenav
          open={openTemporarySidenav}
          onClose={closeTemporarySidenav}
        />
      ) : (
        <Sidenav
          open={matchedMdDown || openPernamentSidenav}
        />
      )}
    </>
  );
};

export default Blueprint;
