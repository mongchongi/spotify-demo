import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { BottomNavigation, BottomNavigationAction, Box, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';

const pagePaths = [
  { name: 'Home', path: '/', icon: <HomeIcon /> },
  { name: 'Search', path: '/search', icon: <SearchIcon /> },
  { name: 'Yor Library', path: '/playlist', icon: <LibraryMusicIcon /> },
];

const MobileNavbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Container>
      <BottomNavigation
        showLabels
        onChange={(_event, newValue) => {
          navigate(pagePaths[newValue].path);
        }}
      >
        {pagePaths.map((pagePath) => (
          <BottomNavigationAction
            key={pagePath.name}
            label={pagePath.name}
            icon={pagePath.icon}
            sx={{
              color: pathname === pagePath.path ? '#A852F6' : undefined,
            }}
          />
        ))}
      </BottomNavigation>
    </Container>
  );
};

export default MobileNavbar;

const Container = styled(Box)(({ theme }) => ({
  display: 'none',

  '& .MuiBottomNavigation-root': {
    background: theme.palette.background.default,
  },

  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));
