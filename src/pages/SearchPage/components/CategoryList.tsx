import { List, ListItem, styled } from '@mui/material';
import useGetCategories from '../../../hooks/useGetCategories';
import CategoryItem from './CategoryItem';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import ErrorMessage from '../../../common/components/ErrorMessage';

const CategoryList = () => {
  const { ref, inView } = useInView();

  const { data, isCombinedLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCategories({
    locale: 'en_US',
    limit: 9,
  });

  const categories = data?.pages.flatMap((page) => {
    return page.categories.items ?? [];
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  if (isCombinedLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <StyledList>
      {categories?.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
      <ListItem sx={{ padding: '1px' }} ref={ref}>
        {isFetchingNextPage && <LoadingMessage>Loading...</LoadingMessage>}
      </ListItem>
    </StyledList>
  );
};

export default CategoryList;

const StyledList = styled(List)(({ theme }) => ({
  listStyle: 'none',
  padding: '0',
  margin: '0',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',
  flex: '1',
  overflowY: 'auto',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
}));

const LoadingMessage = styled('p')(({ theme }) => ({
  margin: '0',
  color: theme.palette.primary.main,
  fontWeight: '700',
}));
