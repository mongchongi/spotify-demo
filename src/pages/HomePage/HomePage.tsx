import { Box, styled } from '@mui/material';
import ErrorMessage from '../../common/components/ErrorMessage';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import useGetNewReleases from '../../hooks/useGetNewReleases';
import type { SimplifiedAlbum } from '../../models/album';
import Releases from './components/Releases';

const HomePage = () => {
  const { data, error, isCombinedLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetNewReleases();

  if (isCombinedLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  const newReleases =
    data?.pages.flatMap((page) => page.albums?.items ?? []).filter((album): album is SimplifiedAlbum => !!album) ?? [];
  const tracks = newReleases?.filter((item) => item.album_type === 'single');
  const albums = newReleases?.filter((item) => item.album_type === 'album');

  return (
    <Container>
      <Releases
        title={'New Released'}
        items={newReleases}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
      <Releases
        title={'Tracks'}
        items={tracks}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
      <Releases
        title={'Albums'}
        items={albums}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  );
};

export default HomePage;

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  overflowY: 'auto',

  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});
