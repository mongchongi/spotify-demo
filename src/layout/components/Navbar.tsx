import { Box } from '@mui/material';
import SignInButton from '../../common/components/SignInButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'} height={'64px'}>
      {!userProfile ? (
        <SignInButton />
      ) : userProfile.images[0].url ? (
        <img src={userProfile.images[0].url} />
      ) : (
        <AccountCircleIcon />
      )}
    </Box>
  );
};

export default Navbar;
