import { Box, styled } from '@mui/material';
import SignInButton from '../../common/components/SignInButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();

  return (
    <Container>
      {!userProfile ? (
        <SignInButton />
      ) : userProfile.images[0]?.url ? (
        <img src={userProfile.images[0]?.url} />
      ) : (
        <AccountCircleIcon />
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
  '& img': {
    width: '44px',
    height: '44px',
    display: 'block',
    borderRadius: '50%',
  },
  '& svg': {
    width: '44px',
    height: '44px',
  },
});
