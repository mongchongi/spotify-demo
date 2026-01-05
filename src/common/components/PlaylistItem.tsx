import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText, styled } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

interface PlaylistItemProps {
  id: string;
  image: string | null;
  name: string;
  artistName: string | null;
  handleNavigatePlaylistDetailPage: (id: string) => void;
  isActive: boolean;
}

const PlaylistItem = ({
  id,
  image,
  name,
  artistName,
  handleNavigatePlaylistDetailPage,
  isActive,
}: PlaylistItemProps) => {
  return (
    <ListItem
      sx={{
        padding: '0',
      }}
      onClick={() => handleNavigatePlaylistDetailPage(id)}
    >
      <StyledListItemButton sx={{ background: `${isActive ? '#2A2D3D' : 'undefined'}` }}>
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
      </StyledListItemButton>
    </ListItem>
  );
};

export default PlaylistItem;

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: '8px',
  borderRadius: '8px',
  cursor: 'pointer',
  '&:hover': {
    background: theme.palette.background.default,
  },
}));
