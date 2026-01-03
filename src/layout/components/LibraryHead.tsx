import { Box, Button, styled, Typography } from '@mui/material';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AddIcon from '@mui/icons-material/Add';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { getSpotifyAuthUrl } from '../../utils/auth';

const LibraryHead = () => {
  const { mutate: createPlaylist } = useCreatePlaylist();
  const { data: userProfile } = useGetCurrentUserProfile();

  const handleCreatePlaylist = () => {
    if (userProfile) {
      createPlaylist({ name: 'My Playlist' });
    } else {
      getSpotifyAuthUrl();
    }
  };

  return (
    <Container>
      <LibraryTitleBox>
        <LibraryMusicIcon />
        <Typography variant='h2' fontWeight={700}>
          Your Library
        </Typography>
      </LibraryTitleBox>
      <Button onClick={handleCreatePlaylist}>
        <AddIcon />
      </Button>
    </Container>
  );
};

export default LibraryHead;

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  justifyContent: 'space-between',
});

const LibraryTitleBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});
