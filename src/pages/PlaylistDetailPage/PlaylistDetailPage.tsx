import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import spotifyIcon from '../../assets/spotify.png';
import {
  Avatar,
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import DesktopPlaylistItem from './components/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { BorderBottom } from '@mui/icons-material';

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { ref, inView } = useInView();

  const { data: playlist } = useGetPlaylist({ playlist_id: id || '' });

  const {
    data: playlistItems,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id || '', limit: PAGE_LIMIT });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (id === undefined) {
    return <Navigate to={'/'} />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <PlaylistHeader>
        <PlaylistHeaderImage src={playlist?.images && playlist?.images[0].url} variant='rounded'>
          {!playlist?.images && <MusicNoteIcon />}
        </PlaylistHeaderImage>
        <PlaylistHeaderInfo>
          <PlaylistHeaderName>{playlist?.name}</PlaylistHeaderName>
          <PlaylistHeaderOwnerInfo>
            <PlaylistHeaderSpotifyIcon src={spotifyIcon} alt='' />
            <p>{playlist?.owner?.display_name ? playlist?.owner.display_name : 'unknown'}</p>
            <p>• {playlist?.tracks.total} song</p>
          </PlaylistHeaderOwnerInfo>
        </PlaylistHeaderInfo>
      </PlaylistHeader>
      {playlist?.tracks?.total === 0 ? (
        <Typography>Search</Typography>
      ) : (
        <StyleTableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow
                sx={{
                  '& th': {
                    background: '#1C1E2A',
                    borderColor: '#2A2D3D',
                  },
                }}
              >
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Date added</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlistItems?.pages.map((page, pageIndex) =>
                page.items.map((item, itemIndex) => {
                  return (
                    <DesktopPlaylistItem
                      key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                      item={item}
                      index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    />
                  );
                })
              )}
              <TableRow
                sx={{
                  '& .MuiTableCell-root': {
                    borderBottom: 'none',
                  },
                }}
              >
                <TableCell colSpan={5} ref={ref} sx={{ padding: '1px 16px 0' }}>
                  {isFetchingNextPage && <LoadingMessage>Loading...</LoadingMessage>}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </StyleTableContainer>
      )}
    </Box>
  );
};

export default PlaylistDetailPage;

const PlaylistHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '32px',
  background: theme.palette.background.default,
  padding: '16px',
  borderRadius: '8px',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 'unset',
  },
}));

const PlaylistHeaderImage = styled(Avatar)(({ theme }) => ({
  width: '250px',
  height: '250px',

  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  '& svg': {
    width: '20%',
    height: '20%',
  },

  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
    aspectRatio: '1 / 1',

    '& svg': {
      width: '10%',
      height: '10%',
    },
  },
}));

const PlaylistHeaderSpotifyIcon = styled('img')({
  display: 'block',
  width: '24px',
});

const PlaylistHeaderInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const PlaylistHeaderName = styled('h2')(({ theme }) => ({
  fontSize: '32px',
  marginBottom: '0',

  [theme.breakpoints.down('md')]: {
    fontSize: '24px',
  },
}));

const PlaylistHeaderOwnerInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const StyleTableContainer = styled(TableContainer)({
  flex: '1',
  overflowY: 'auto',
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
