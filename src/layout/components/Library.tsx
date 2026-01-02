import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import EmptyPlaylist from './EmptyPlaylist';
import { styled } from '@mui/system';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Playlist from './Playlist';
import { List } from '@mui/material';

const Library = () => {
  const { ref, inView } = useInView();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });

  const { data: user } = useGetCurrentUserProfile();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (!user) {
    return <EmptyPlaylist />;
  }

  return (
    <>
      {!data || data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          <List sx={{ padding: '0' }}>
            {data?.pages.map((page, index) => (
              <Playlist key={index} playlists={page.items} />
            ))}
          </List>
          <div ref={ref} style={{ padding: '1px 8px 0' }}>
            {isFetchingNextPage && <LoadingMessage>Loading...</LoadingMessage>}
          </div>
        </PlaylistContainer>
      )}
    </>
  );
};

export default Library;

const PlaylistContainer = styled('div')({
  overflow: 'auto',
  flex: '1',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const LoadingMessage = styled('p')(({ theme }) => ({
  margin: '0',
  color: theme.palette.primary.main,
  fontWeight: '700',
}));
