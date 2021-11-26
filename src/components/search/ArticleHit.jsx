// @mui/material
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

// @src/components
import Highlight from './Highlight';
import Link from './../Link';

const ArticleHit = ({ hit, onSearchClose }) => {
  return (
    <ListItemButton
      dense
      component={Link}
      href={`/blog/${hit.slug}`}
      onClick={onSearchClose}
    >
      <ListItemAvatar>
        <Avatar variant="rounded" src={hit.imageCover} />
      </ListItemAvatar>

      <ListItemText
        primary={<Highlight hit={hit} attribute="title" />}
      />
    </ListItemButton>
  );
};

export default ArticleHit;
