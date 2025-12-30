import { Box, Button, styled } from '@mui/material';
import SignInButton from '../../common/components/SignInButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';

const Navbar = () => {
  const [showSignOut, setShowSignOut] = useState<boolean>(false);

  const { data: userProfile } = useGetCurrentUserProfile();

  const handleShowSignOut = () => {
    setShowSignOut(!showSignOut);
  };

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    window.location.reload();
  };

  return (
    <Container>
      {userProfile ? (
        <Profile onClick={handleShowSignOut}>
          {userProfile.images[0]?.url ? <img src={userProfile.images[0]?.url} /> : <AccountCircleIcon />}
        </Profile>
      ) : (
        <SignInButton />
      )}
      {showSignOut && (
        <SignOutButton size='large' onClick={handleSignOut}>
          Sign out
        </SignOutButton>
      )}
    </Container>
  );
};

export default Navbar;

const Container = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: '64px',
  paddingRight: '8px',
  position: 'relative',
});

const Profile = styled(Box)({
  width: '44px',
  height: '44px',
  cursor: 'pointer',

  '& img': {
    width: '100%',
    height: '100%',
    display: 'block',
    borderRadius: '50%',
  },
  '& svg': {
    width: '100%',
    height: '100%',
  },
});

const SignOutButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  right: '68px',
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
}));
