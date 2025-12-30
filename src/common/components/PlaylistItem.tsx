import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

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
          background: '#2A2D3D',
        },
      }}
      onClick={() => handleNavigatePlaylistDetailPage(id)}
    >
      <ListItemAvatar>
        <Avatar sx={{ borderRadius: '8px' }}>{image ? <img src={image} /> : <ImageNotSupportedIcon />}</Avatar>
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
