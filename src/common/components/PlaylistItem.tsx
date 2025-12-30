import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

interface PlaylistItemProps {
  id: string;
  image: string | null;
  name: string;
  artistName: string | null;
  handleNavigatePlaylistDetailPage: (id: string) => void;
}

const PlaylistItem = ({ id, image, name, artistName, handleNavigatePlaylistDetailPage }: PlaylistItemProps) => {
  return (
    <ListItem
      sx={{
        padding: '4px 8px',
        borderRadius: '8px',
        cursor: 'pointer',
        '&:hover': {
          background: '#2a2d3d',
        },
      }}
      onClick={() => handleNavigatePlaylistDetailPage(id)}
    >
      <ListItemAvatar>
        <Avatar src={image || undefined} variant='rounded' sx={{ width: '50px', height: '50px' }}>
          {!image && <MusicNoteIcon />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        sx={{
          '& span, p': {
            maxWidth: '180px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
          '& span': {
            fontWeight: '700',
            color: '#A852F6',
          },
        }}
        primary={name}
        secondary={artistName}
      />
    </ListItem>
  );
};

export default PlaylistItem;
