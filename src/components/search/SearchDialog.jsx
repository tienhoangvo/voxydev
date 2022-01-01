// @mui/material
import Dialog from '@mui/material/Dialog';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import CardActions from '@mui/material/CardActions';
import { useMediaQuery } from '@mui/material';

// @mui/icons-material
import CloseIcon from '@mui/icons-material/Close';

// @react-instantsearch-dom
import {
  InstantSearch,
  Index,
} from 'react-instantsearch-dom';

// @src/lib/algolia
import { algoliaSearchClient } from '../../lib/algolia';

// @src/components

import Hits from './Hits';
import SearchBox from './SearchBox';

const SearchDialog = ({ open = false, onClose }) => {
  const matchedSMDown = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );

  return (
    <Dialog
      fullScreen={matchedSMDown}
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
    >
      <CardHeader
        component="header"
        title="Search"
        sx={{
          borderBottom: 2,
          borderColor: 'divider',
          p: (theme) => theme.spacing(1, 2),
        }}
        action={
          <IconButton onClick={onClose}>
            <CloseIcon size="small" />
          </IconButton>
        }
        titleTypographyProps={{
          sx: {
            fontSize: '1rem',
            fontWeight: 700,
          },
        }}
      />

      <InstantSearch
        indexName="articles"
        searchClient={algoliaSearchClient}
      >
        <CardActions
          sx={{ p: (theme) => theme.spacing(1, 2) }}
        >
          <SearchBox />
        </CardActions>

        <CardContent
          sx={{ height: '85vh', overflowY: 'scroll', p: 0 }}
        >
          <Index indexName="articles">
            <List
              subheader={
                <ListSubheader disableSticky>
                  Articles
                </ListSubheader>
              }
            >
              <Hits onSearchClose={onClose} />
            </List>
          </Index>
          <Index indexName="videos">
            <List
              subheader={
                <ListSubheader disableSticky>
                  Videos
                </ListSubheader>
              }
            >
              <Hits onSearchClose={onClose} />
            </List>
          </Index>
        </CardContent>
      </InstantSearch>
    </Dialog>
  );
};

export default SearchDialog;
