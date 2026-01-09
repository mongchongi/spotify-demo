import { styled, TableCell, TableRow } from '@mui/material';
import type { PlaylistTrack } from '../../../models/playlist';
import type { Episode, Track } from '../../../models/track';

interface DesktopPlaylistItemProps {
  item: PlaylistTrack;
  index: number;
}

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return 'description' in track;
  };

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) {
      return 'Unknown';
    }

    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  const formatDuration = (millisecond: number | undefined): string => {
    if (!millisecond) {
      return 'Unknown';
    }

    const minutes: number = Math.floor(millisecond / 60000);
    const seconds: number = Math.floor((millisecond % 60000) / 1000);

    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <StyledTableRow
      sx={{
        '&': (theme) => ({
          [theme.breakpoints.down('sm')]: {
            display: 'none',
          },
        }),
      }}
    >
      <TableCell>{index}</TableCell>
      <TableCell>{item.track.name || 'Unknown'}</TableCell>
      <TableCell>{isEpisode(item.track) ? 'N/A' : item.track.album?.name}</TableCell>
      <TableCell>{formatDate(item.added_at)}</TableCell>
      <TableCell>{formatDuration(item.track.duration_ms)}</TableCell>
    </StyledTableRow>
  );
};

export default DesktopPlaylistItem;

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '& .MuiTableCell-root': {
    borderBottom: 'none',
  },
  '&:hover': {
    background: theme.palette.background.default,
  },
}));
