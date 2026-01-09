import { Avatar, Box, TableCell, TableRow, Typography } from '@mui/material';
import type { PlaylistTrack } from '../../../models/playlist';
import type { Episode, Track } from '../../../models/track';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import theme from '../../../theme';

interface MobilePlaylistItemProps {
  item: PlaylistTrack;
}

const MobilePlaylistItem = ({ item }: MobilePlaylistItemProps) => {
  const isTrack = (track: Track | Episode): track is Track => {
    return 'album' in track;
  };

  return (
    <TableRow
      sx={{
        display: 'none',

        '&': (theme) => ({
          [theme.breakpoints.down('sm')]: {
            display: 'table-row',
          },
        }),
        '& .MuiTableCell-root': {
          borderBottom: 'none',
        },
        '&:hover': {
          background: theme.palette.background.default,
        },
      }}
    >
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Avatar
            src={isTrack(item.track) ? item.track.album?.images[0].url : undefined}
            variant='rounded'
            sx={{ width: '50px', height: '50px' }}
          >
            <MusicNoteIcon />
          </Avatar>
          <Box sx={{ minWidth: '0', flex: '1' }}>
            <Typography variant='h2' fontWeight={700}>
              {item.track.name}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              {isTrack(item.track)
                ? item.track?.album?.artists.map((artist) => artist.name).join(', ')
                : 'Unknown Artist'}
            </Typography>
          </Box>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default MobilePlaylistItem;
