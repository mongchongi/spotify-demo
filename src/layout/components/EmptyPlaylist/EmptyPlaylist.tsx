import { Button, styled, Typography } from '@mui/material';

const EmptyPlaylist = () => {
  return (
    <Container>
      <Typography variant='h2' fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography variant='body2'>It's easy, we'll help you</Typography>
      <CreatePlaylistButton variant='contained' color='secondary'>
        Create playlist
      </CreatePlaylistButton>
    </Container>
  );
};

export default EmptyPlaylist;

const Container = styled('div')(({ theme }) => ({
  background: theme.palette.background.default,
  padding: '16px',
  borderRadius: '8px',
}));
const CreatePlaylistButton = styled(Button)(({ theme }) => ({
  marginTop: '16px',
  fontWeight: '700',
  color: theme.palette.background.paper,
}));
