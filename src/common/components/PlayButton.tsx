import { styled } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const PlayButton = () => {
  return (
    <PlayButtonContainer>
      <PlayArrowIcon />
    </PlayButtonContainer>
  );
};

export default PlayButton;

const PlayButtonContainer = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  border: 'none',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: theme.palette.text.primary,
  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 8px 8px 0px',
  '&:focus': {
    outline: 'none',
  },
}));
