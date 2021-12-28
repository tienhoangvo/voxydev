// @mui/material
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

// @react-instantsearch-dom
import { connectSearchBox } from 'react-instantsearch-dom';

// @src/components/search
import LoadingIndicator from './LoadingIndicator';

const SearchBox = ({
  currentRefinement,
  isSearchStalled,
  refine,
}) => {
  const onInputChange = (event) => {
    refine(event.currentTarget.value);
  };

  return (
    <Box
      component="form"
      sx={{ width: '100%' }}
      noValidate
      role="search"
      onSubmit={(event) => event.preventDefault()}
    >
      <TextField
        autoFocus
        size="small"
        variant="outlined"
        fullWidth
        placeholder="Search for articles, videos..."
        type="search"
        value={currentRefinement}
        onChange={onInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LoadingIndicator
                isSearchStalled={isSearchStalled}
              />
            </InputAdornment>
          ),

          sx: {
            '& input[type="search"]::-webkit-search-cancel-button':
              {
                cursor: 'pointer',
              },
          },
        }}
      />
    </Box>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
