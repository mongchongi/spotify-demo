import { Box, styled, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryHead from '../components/LibraryHead/LibraryHead';
import Library from '../components/Library/Library';

const AppLayout = () => {
  return (
    <Container>
      <Sidebar>
        <ContentBox>
          <Menu>
            <MenuList>
              <li>
                <MenuLink to={'/'}>
                  <HomeIcon />
                  <Typography variant='h2' fontWeight={700}>
                    Home
                  </Typography>
                </MenuLink>
              </li>
              <li>
                <MenuLink to={'/search'}>
                  <SearchIcon />
                  <Typography variant='h2' fontWeight={700}>
                    Search
                  </Typography>
                </MenuLink>
              </li>
            </MenuList>
          </Menu>
        </ContentBox>
        <ContentBox height={'100%'}>
          <LibraryHead />
          <Library />
        </ContentBox>
      </Sidebar>
      <Outlet />
    </Container>
  );
};

export default AppLayout;

const Container = styled('div')({
  display: 'flex',
  height: '100vh',
  padding: '8px',
  gap: '8px',
});

const Sidebar = styled('div')(({ theme }) => ({
  width: '331px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: '100%',
  padding: '8px',
}));

const Menu = styled('nav')({
  padding: '24px 0',
});

const MenuList = styled('ul')({
  listStyle: 'none',
  padding: '0',
  margin: '0',
});

const MenuLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  color: theme.palette.text.secondary,
  padding: '4px 8px',
  '&:hover': {
    color: theme.palette.action.hover,
  },
  '&.active': {
    color: theme.palette.action.active,
  },
}));
