import { Navigate, NavLink, useNavigate, useParams } from 'react-router';
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
import EmptyPlaylistWithSearch from './components/EmptyPlaylistWithSearch';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import SignInButton from '../../common/components/SignInButton';
import ErrorMessage from '../../common/components/ErrorMessage';
import axios from 'axios';

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { ref, inView } = useInView();

  const {
    data: playlist,
    error: playlistError,
    isLoading: isPlaylistLoading,
  } = useGetPlaylist({ playlist_id: id || '' });

  const {
    data: playlistItems,
    error: playlistItemsError,
    isLoading: isPlaylistItemsLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id || '', limit: PAGE_LIMIT });

  const isLoading = isPlaylistLoading || isPlaylistItemsLoading;
  const error = playlistError || playlistItemsError;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (id === undefined) {
    return <Navigate to={'/'} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    const isError = axios.isAxiosError(error);

    if (isError) {
      if (error.status === 401) {
        return (
          <AgainSignInContainer>
            <Typography variant='h2' fontSize={'24px'} fontWeight={700}>
              Please Sign in again.
            </Typography>
            <SignInButton />
            <HomeLink to={'/'}>Go to Home</HomeLink>
          </AgainSignInContainer>
        );
      }
    }

    return <ErrorMessage errorMessage='failed to load'></ErrorMessage>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', gap: '16px' }}>
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
        <EmptyPlaylistWithSearch />
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

const HomeLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const AgainSignInContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  background: theme.palette.background.default,
}));

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

  [theme.breakpoints.down('sm')]: {
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
