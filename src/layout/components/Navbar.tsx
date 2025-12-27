import { Box, styled } from '@mui/material';
import SignInButton from '../../common/components/SignInButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();

  return (
    <Container>
      {userProfile ? (
        <Profile>
          userProfile.images[0]?.url ? (
          <img src={userProfile.images[0]?.url} />
          ) : (
          <AccountCircleIcon />)
        </Profile>
      ) : (
        <SignInButton />
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
});

const Profile = styled(Box)({
  width: '44px',
  height: '44px',

  '& img': {
    width: '100%',
    display: 'block',
    borderRadius: '50%',
  },
  '& svg': {
    width: '100%',
  },
});
