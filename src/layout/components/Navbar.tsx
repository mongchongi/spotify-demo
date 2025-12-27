import { Box } from '@mui/material';
import SignInButton from '../../common/components/SignInButton';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  console.log('🚀 ~ Navbar ~ userProfile:', userProfile);

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'} height={'64px'}>
      {userProfile ? <img src={userProfile.images[0]?.url} alt='' /> : <SignInButton />}
    </Box>
  );
};

export default Navbar;
