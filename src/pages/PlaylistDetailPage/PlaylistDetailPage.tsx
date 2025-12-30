import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import spotifyIcon from '../../assets/spotify.png';
import { Avatar, styled } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: playlist } = useGetPlaylist({ playlist_id: id || '' });

  if (id === undefined) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <PlaylistHeader>
        <PlaylistHeaderImage src={playlist?.images && playlist?.images[0].url} variant='rounded'>
          {!playlist?.images && <MusicNoteIcon />}
        </PlaylistHeaderImage>
        <PlaylistHeaderInfo>
          <PlaylistHeaderName>{playlist?.name}</PlaylistHeaderName>
          <PlaylistHeaderOwnerInfo>
            <PlaylistHeaderSpotifyIcon src={spotifyIcon} alt='' />
            <p>{playlist?.owner?.display_name ? playlist?.owner.display_name : 'unknown'}</p>
            <p>• {playlist?.tracks.total} song</p>
          </PlaylistHeaderOwnerInfo>
        </PlaylistHeaderInfo>
      </PlaylistHeader>
    </>
  );
};

export default PlaylistDetailPage;

const PlaylistHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '32px',
  background: theme.palette.background.default,
  padding: '16px',
  borderRadius: '8px',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 'unset',
  },
}));

const PlaylistHeaderImage = styled(Avatar)(({ theme }) => ({
  width: '250px',
  height: '250px',

  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  '& svg': {
    width: '20%',
    height: '20%',
  },

  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
    aspectRatio: '1 / 1',

    '& svg': {
      width: '10%',
      height: '10%',
    },
  },
}));

const PlaylistHeaderSpotifyIcon = styled('img')({
  display: 'block',
  width: '24px',
});

const PlaylistHeaderInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const PlaylistHeaderName = styled('h2')(({ theme }) => ({
  fontSize: '32px',
  marginBottom: '0',

  [theme.breakpoints.down('md')]: {
    fontSize: '24px',
  },
}));

const PlaylistHeaderOwnerInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});
