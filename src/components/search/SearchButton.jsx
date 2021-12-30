// @mui/material
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useMediaQuery } from '@mui/material';

// @mui/icons-material
import SearchIcon from '@mui/icons-material/Search';

// @react
import { useState } from 'react';

// @src/constants
import { DRAWER_WIDTH } from '../../constants';

// @src/components
import SearchDialog from './SearchDialog';

const SearchButton = () => {
  const [open, setOpen] = useState(false);

  const onSearchDialogOpen = () => {
    setOpen(true);
  };
  const onSearchDialogClose = () => {
    setOpen(false);
  };

  const matchedSMDown = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );

  return (
    <>
      <IconButton
        size="small"
        onClick={onSearchDialogOpen}
        sx={{
          display: { md: 'none' },
          ml: 'auto',
          mr: 1,
          border: 2,
          borderColor: 'divider',
        }}
      >
        <SearchIcon fontSize="small" />
      </IconButton>

      <Button
        size="small"
        onClick={onSearchDialogOpen}
        variant="outlined"
        startIcon={<SearchIcon />}
        sx={{
          display: { xs: 'none', md: 'flex' },
          ml: 'auto',
          mr: 1,
          minWidth: DRAWER_WIDTH,
          justifyContent: 'flex-start',
        }}
      >
        Search...{' '}
      </Button>
      <SearchDialog
        open={open}
        onClose={onSearchDialogClose}
      />
    </>
  );
};

export default SearchButton;
