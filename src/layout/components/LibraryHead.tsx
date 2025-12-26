import { Box, Button, styled, Typography } from '@mui/material';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AddIcon from '@mui/icons-material/Add';

const LibraryHead = () => {
  return (
    <Container>
      <LibraryTitleBox>
        <LibraryMusicIcon />
        <Typography variant='h2' fontWeight={700}>
          Your Library
        </Typography>
      </LibraryTitleBox>
      <Button>
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
