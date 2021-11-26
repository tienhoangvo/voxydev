// @mui/material
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

// @mui/icons-material
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const HitNoResult = () => {
  return (
    <ListItem>
      <ListItemIcon>
        <SentimentVeryDissatisfiedIcon />
      </ListItemIcon>

      <ListItemText primary="No results" />
    </ListItem>
  );
};

export default HitNoResult;
