import { Avatar, Box, styled, Typography } from '@mui/material';
import type { Track } from '../../../models/track';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

interface TopResultProps {
  track: Track;
}

const TopResult = ({ track }: TopResultProps) => {
  const imageUrl = track.album?.images[0]?.url;
  const artistName = track.artists ? track.artists.map((artist) => artist.name).join(', ') : 'unknown';

  return (
    <Container>
      <Typography variant='h1' fontWeight={700}>
        Top result
      </Typography>
      <TopResultInfo>
        <TopResultImage src={imageUrl} variant='rounded'>
          {!imageUrl && <MusicNoteIcon />}
        </TopResultImage>
        <Typography variant='h2' fontWeight={700} fontSize={'20px'}>
          {track.name}
        </Typography>
        <Typography variant='body1'>Song • {artistName}</Typography>
      </TopResultInfo>
    </Container>
  );
};

export default TopResult;

const Container = styled(Box)(({ theme }) => ({
  width: '35%',

  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const TopResultInfo = styled(Box)({
  marginTop: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: '1',
});

const TopResultImage = styled(Avatar)(({ theme }) => ({
  width: '200px',
  height: '200px',
  marginBottom: '8px',

  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  '& svg': {
    width: '20%',
    height: '20%',
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: 'auto',
    aspectRatio: '1 / 1',

    '& svg': {
      width: '10%',
      height: '10%',
    },
  },
}));
