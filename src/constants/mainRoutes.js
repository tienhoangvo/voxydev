import YouTubeIcon from '@mui/icons-material/YouTube';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HomeIcon from '@mui/icons-material/Home';

import ArticleIcon from '@mui/icons-material/Article';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const mainRoutes = [
  {
    label: 'Home',
    route: '/',
    icon: <HomeIcon fontSize="small" />,
  },
  {
    label: 'Blog',
    route: '/blog',
    icon: <ArticleIcon fontSize="small" />,
  },
  {
    label: 'Videos',
    route: '/videos',
    icon: <YouTubeIcon fontSize="small" />,
  },
  {
    label: 'Courses',
    route: '/courses',
    icon: <LibraryBooksIcon fontSize="small" />,
  },
  {
    label: 'Contact',
    route: '/contact',
    icon: <AlternateEmailIcon fontSize="small" />,
  },
];
export default mainRoutes;
