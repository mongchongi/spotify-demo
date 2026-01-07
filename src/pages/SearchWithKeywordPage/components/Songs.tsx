import {
  Alert,
  Avatar,
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import type { Track } from '../../../models/track';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import PlaylistModal from './PlaylistModal';
import useGetCurrentUserProfile from '../../../hooks/useGetCurrentUserProfile';
import { getSpotifyAuthUrl } from '../../../utils/auth';

interface SongsProps {
  tracks: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const Songs = ({ tracks, hasNextPage, isFetchingNextPage, fetchNextPage }: SongsProps) => {
  const [openedTrackId, setOpenedTrackId] = useState<string | undefined>(undefined);
  const [successAlertOpen, setSuccessAlertOpen] = useState<boolean>(false);

  const { data: userProfile } = useGetCurrentUserProfile();

  const { ref, inView } = useInView();

  const formatDuration = (millisecond: number | undefined): string => {
    if (!millisecond) {
      return 'Unknown';
    }

    const minutes: number = Math.floor(millisecond / 60000);
    const seconds: number = Math.floor((millisecond % 60000) / 1000);

    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const handleShowPlaylistModal = (trackId: string) => {
    if (userProfile) {
      setOpenedTrackId(trackId);
    } else {
      getSpotifyAuthUrl();
    }
  };

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);

    setTimeout(() => {
      setSuccessAlertOpen(false);
    }, 2000);
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <Container>
      {successAlertOpen && (
        <Alert sx={{ position: 'absolute', bottom: '16px', right: '16px' }} severity='success'>
          The song has been added to your playlist!
        </Alert>
      )}
      <Typography variant='h1' fontWeight={700}>
        Songs
      </Typography>
      <StyledTableContainer>
        <Table>
          <TableBody>
            {tracks.map((track, index) => (
              <TableRow key={`${index}_${track.id}`}>
                <TableCell width={'66px'}>
                  <Avatar src={track.album?.images[0].url} variant='rounded' sx={{ width: '50px', height: '50px' }}>
                    {!track.album?.images[0] && <MusicNoteIcon />}
                  </Avatar>
                </TableCell>
                <TableCell width={'100%'}>
                  <Typography variant='h2' fontWeight={700}>
                    {track.name}
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    {track.artists ? track.artists[0]?.name : 'unknown'}
                  </Typography>
                </TableCell>
                <TableCell width={'80px'} sx={{ position: 'relative' }}>
                  <Button className='add-playlist-button' onClick={() => track.id && handleShowPlaylistModal(track.id)}>
                    <AddCircleOutlineIcon />
                  </Button>
                  {openedTrackId === track.id && (
                    <Box>
                      <PlaylistModal
                        trackUri={track.uri}
                        onClose={() => setOpenedTrackId(undefined)}
                        onSuccess={handleSuccessAlertOpen}
                      />
                    </Box>
                  )}
                </TableCell>
                <TableCell width={'51px'}>{formatDuration(track.duration_ms)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={5} ref={ref} sx={{ padding: '1px 16px 0' }}>
                {isFetchingNextPage && <LoadingMessage>Loading...</LoadingMessage>}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Container>
  );
};

export default Songs;

const Container = styled(Box)(({ theme }) => ({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginTop: '40px',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  height: '320px',
  overflowY: 'auto',
  overflowX: 'hidden',

  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },

  '& .MuiTable-root': {
    tableLayout: 'fixed',
    width: '100%',
  },

  '& .MuiTableRow-root:hover': {
    background: theme.palette.background.default,
  },

  '& .MuiTableCell-root .add-playlist-button': {
    visibility: 'hidden',
  },

  '& .MuiTableRow-root:hover .add-playlist-button': {
    visibility: 'visible',
    cursor: 'pointer',
  },

  '& .MuiButtonBase-root:hover': {
    color: theme.palette.primary.main,
  },

  '& .MuiTableCell-root': {
    padding: '8px',
    borderBottom: 'none',
  },

  [theme.breakpoints.down('sm')]: {
    '& .MuiTableCell-root:last-child': {
      display: 'none',
    },
  },
}));

const LoadingMessage = styled('p')(({ theme }) => ({
  margin: '0',
  color: theme.palette.primary.main,
  fontWeight: '700',
}));
