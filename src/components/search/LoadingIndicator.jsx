// @mui/material
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';

const LoadingIndicator = ({ isSearchStalled }) => {
  return isSearchStalled ? (
    <CircularProgress size="1.5rem" thickness={5} />
  ) : (
    <SearchIcon />
  );
};

export default LoadingIndicator;
