import { Button } from '@mui/material';
import { getSpotifyAuthUrl } from '../../utils/auth';

const SignInButton = () => {
  const handleSignIn = () => {
    getSpotifyAuthUrl();
  };

  return (
    <Button variant='contained' color='secondary' size='large' onClick={handleSignIn}>
      Sign in
    </Button>
  );
};

export default SignInButton;
