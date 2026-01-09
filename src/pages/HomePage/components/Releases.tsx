import { List, ListItem, styled, Typography } from '@mui/material';
import Card from '../../../common/components/Card';
import type { SimplifiedAlbum } from '../../../models/album';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface ReleasesProps {
  title: string;
  items: SimplifiedAlbum[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const Releases = ({ title, items, hasNextPage, isFetchingNextPage, fetchNextPage }: ReleasesProps) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <div>
      <Typography variant='h1' padding={'8px'}>
        {title}
      </Typography>
      {items && items.length > 0 ? (
        <StyledList>
          {items.map((item) => (
            <StyledListItem key={item.id}>
              <Card
                image={item.images[0].url}
                name={item.name}
                artistName={item.artists.map((artist) => artist.name).join(', ')}
              />
            </StyledListItem>
          ))}
          <ListItem
            ref={ref}
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              padding: '0 0 8px',
            }}
          >
            {isFetchingNextPage && <LoadingMessage>Loading...</LoadingMessage>}
          </ListItem>
        </StyledList>
      ) : (
        <Typography variant='h2'>No Data</Typography>
      )}
    </div>
  );
};

export default Releases;

const StyledList = styled(List)({
  display: 'flex',
  overflowX: 'auto',
  padding: '0',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const StyledListItem = styled(ListItem)({
  padding: '0',
});

const LoadingMessage = styled('p')(({ theme }) => ({
  margin: '0',
  color: theme.palette.primary.main,
  fontWeight: '700',
}));
