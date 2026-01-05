import { Box, styled, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CategoryList from './components/CategoryList';

const SearchPage = () => {
  return (
    <Container>
      <StyledTextField>
        <SearchIcon />
        <input type='text' placeholder='Search...' />
      </StyledTextField>
      <Box sx={{ margin: '16px 0 12px' }}>
        <Typography variant='h1' fontWeight={700}>
          Browse all
        </Typography>
      </Box>
      <CategoryList />
    </Container>
  );
};

export default SearchPage;

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

const StyledTextField = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px',
  background: theme.palette.background.default,
  borderRadius: '50px',
  gap: '8px',

  '& input': {
    flex: '1',
    background: 'transparent',
    border: 'none',
    color: theme.palette.text.primary,

    '&:focus': {
      outline: 'none',
    },
  },
}));
