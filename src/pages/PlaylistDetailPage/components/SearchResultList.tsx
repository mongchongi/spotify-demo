import {
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
import AddIcon from '@mui/icons-material/Add';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import useAddTrackToPlaylist from '../../../hooks/useAddTrackToPlaylist';

interface SearchResultListProps {
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const SearchResultList = ({ list, hasNextPage, isFetchingNextPage, fetchNextPage }: SearchResultListProps) => {
  const [ref, inView] = useInView();

  const { id: playlist_id } = useParams<{ id: string }>();

  const { mutate: addPlaylist } = useAddTrackToPlaylist(playlist_id || '');

  const handleAddPlaylist = (trackUri: string | undefined) => {
    if (!trackUri) {
      throw new Error('track uri is not defined');
    }
    addPlaylist(trackUri);
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <StyledTableContainer>
      <Table>
        <TableBody>
          {list.map((track, index) => {
            return (
              <StyledTableRow key={`${index}_${track.id}`}>
                <TableCell>
                  <AlbumContainer>
                    <Avatar src={track.album?.images[0].url} variant='rounded' sx={{ width: '50px', height: '50px' }}>
                      {!track.album?.images[0] && <MusicNoteIcon />}
                    </Avatar>
                    <Box>
                      <Typography fontWeight={700}>{track.name}</Typography>
                      <Typography color='text.secondary' fontSize={'12px'}>
                        {track.artists ? track.artists[0].name : 'Unknown Artist'}
                      </Typography>
                    </Box>
                  </AlbumContainer>
                </TableCell>
                <TableCell
                  sx={{
                    '&': (theme) => ({
                      [theme.breakpoints.down('sm')]: {
                        display: 'none',
                      },
                    }),
                  }}
                >
                  {track.album?.name}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleAddPlaylist(track.uri)}>
                    <AddIcon />
                  </Button>
                </TableCell>
              </StyledTableRow>
            );
          })}
          <StyledTableRow
            sx={{
              '& .MuiTableCell-root': {
                padding: '1px 0',
              },
            }}
          >
            <TableCell colSpan={5} ref={ref}>
              {isFetchingNextPage && <LoadingMessage>Loading...</LoadingMessage>}
            </TableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default SearchResultList;

const StyledTableContainer = styled(TableContainer)({
  flex: '1',
  minHeight: '0',
  overflowY: 'auto',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '& .MuiTableCell-root': {
    borderBottom: 'none',
    padding: '12px',
  },
  '&:hover': {
    background: theme.palette.background.default,
  },
}));

const AlbumContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

const LoadingMessage = styled('p')(({ theme }) => ({
  margin: '0',
  color: theme.palette.primary.main,
  fontWeight: '700',
}));
