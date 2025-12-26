import { Box } from '@mui/material';
import SignInButton from '../../common/components/SignInButton';

const Navbar = () => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'} height={'64px'}>
      <SignInButton />
    </Box>
  );
};

export default Navbar;
