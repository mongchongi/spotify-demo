import { useParams } from 'react-router';
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { searchType } from '../../models/search';
import { Box, styled } from '@mui/material';
import TopResult from './components/TopResult';
import Songs from './components/Songs';
import MediaCardList from './components/MediaCardList';
import type { Track } from '../../models/track';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import ErrorMessage from '../../common/components/ErrorMessage';
import SearchForm from '../../common/components/SearchForm';
import type { Artist } from '../../models/artist';
import type { SimplifiedAlbum } from '../../models/album';

const SearchWithKeywordPage = () => {
  const { keyword } = useParams();

  const { data, error, isCombinedLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
    q: keyword || '',
    type: [searchType.Track, searchType.Album, searchType.Artist],
  });

  if (isCombinedLoading) {
    return <LoadingSpinner />;
  }

  const tracks =
    data?.pages.flatMap((page) => page.tracks?.items ?? []).filter((track): track is Track => !!track) ?? [];

  const artists =
    data?.pages.flatMap((page) => page.artists?.items ?? []).filter((album): album is Artist => !!album) ?? [];

  const albums =
    data?.pages.flatMap((page) => page.albums?.items ?? []).filter((album): album is SimplifiedAlbum => !!album) ?? [];

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <Container>
      <SearchForm />
      <MainResults>
        <TopResult track={tracks[0]} />
        <Songs
          tracks={tracks}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </MainResults>
      <SubResults>
        <MediaCardList
          title={'Artists'}
          items={artists}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
        <MediaCardList
          title={'Albums'}
          items={albums}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </SubResults>
    </Container>
  );
};

export default SearchWithKeywordPage;

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',

  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const MainResults = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  marginTop: '24px',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const SubResults = styled(Box)({
  marginTop: '40px',
});
