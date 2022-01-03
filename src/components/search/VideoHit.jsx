// @mui/material
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

// @src/components
import Highlight from './Highlight';

const VideoHit = ({ hit, onSearchClose }) => {
  return (
    <ListItemButton
      dense
      component={'a'}
      rel="noopener"
      target="_blank"
      href={hit.url}
      onClick={onSearchClose}
    >
      <ListItemAvatar>
        <Avatar variant="rounded" src={hit.thumbnail} />
      </ListItemAvatar>

      <ListItemText
        primary={<Highlight hit={hit} attribute="title" />}
      />
    </ListItemButton>
  );
};

export default VideoHit;
