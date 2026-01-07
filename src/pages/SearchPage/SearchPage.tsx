import { Box, styled, Typography } from '@mui/material';
import CategoryList from './components/CategoryList';
import SearchForm from '../../common/components/SearchForm';

const SearchPage = () => {
  return (
    <Container>
      <SearchForm />
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
