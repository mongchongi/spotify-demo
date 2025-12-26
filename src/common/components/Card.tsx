import { Box, styled, Typography } from '@mui/material';
import PlayButton from './PlayButton';

interface CardProps {
  image: string;
  name: string;
  artistName: string | undefined;
}

const Card = ({ image, name, artistName }: CardProps) => {
  return (
    <Container>
      <Box sx={{ position: 'relative' }}>
        <AlbumImage src={image} alt='' />
        <Overlay className='overlay'>
          <PlayButton />
        </Overlay>
      </Box>
      <EllipsisTypography variant='h2' fontWeight={700}>
        {name || 'No name'}
      </EllipsisTypography>
      <EllipsisTypography variant='body1' color='text.secondary'>
        {artistName || 'No artist'}
      </EllipsisTypography>
    </Container>
  );
};

export default Card;

const Container = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  borderRadius: '8px',
  padding: '8px',
  '&:hover': {
    background: theme.palette.background.default,
    transform: 'translate3d(0px, 0px, 0px)',
    transition: 'opacity 0.3s ease-in-out',
  },
  '&:hover .overlay': {
    opacity: '1',
  },
}));

const AlbumImage = styled('img')({
  width: '100%',
  height: 'auto',
  display: 'block',
  borderRadius: '8px',
});

const EllipsisTypography = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const Overlay = styled('div')({
  position: 'absolute',
  bottom: '8px',
  right: '8px',
  opacity: '0',
  transform: 'translate3d(0px, 0px, 0px)',
  transition: 'opacity 0.3s ease-in-out',
});
