import { Avatar, Box, Button, List, ListItem, styled, Typography } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import type { Artist } from '../../../models/artist';
import type { SimplifiedAlbum } from '../../../models/album';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

type MediaItem = Artist & SimplifiedAlbum;

interface MediaCardListProps<T> {
  title: string;
  items: T[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const MediaCardList = <T extends Partial<MediaItem>>({
  title,
  items,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: MediaCardListProps<T>) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <div>
      <Typography variant='h1' fontWeight={700}>
        {title}
      </Typography>
      <StyledList>
        {items.map((item, index) => {
          return (
            <ListItem key={`${index}_${item.id}`} sx={{ padding: '0' }}>
              <StyledListItemInfo>
                <Button>
                  <PlayCircleIcon sx={{ fontSize: '64px' }} />
                </Button>
                <StyledAvatar src={item.images && item.images[0]?.url} variant='rounded' sx={{ width: '100%' }}>
                  {!item.images && <MusicNoteIcon />}
                </StyledAvatar>
                <StyledTypography variant='h2' fontWeight={700}>
                  {item.name}
                </StyledTypography>
                {title === 'Artists' ? (
                  <StyledTypography variant='body1' color='text.secondary'>
                    {title}
                  </StyledTypography>
                ) : (
                  <StyledTypography variant='body1' color='text.secondary'>
                    {item.artists ? item.artists[0].name : 'Unknown'}
                  </StyledTypography>
                )}
              </StyledListItemInfo>
            </ListItem>
          );
        })}
        <ListItem
          ref={ref}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            padding: '0 1px 8px',
          }}
        >
          {isFetchingNextPage && <LoadingMessage>Loading...</LoadingMessage>}
        </ListItem>
      </StyledList>
    </div>
  );
};

export default MediaCardList;

const StyledList = styled(List)({
  listStyle: 'none',
  padding: '0',
  margin: '0',
  display: 'flex',
  overflowX: 'auto',

  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const StyledListItemInfo = styled(Box)(({ theme }) => ({
  width: '200px',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  padding: '8px',
  gap: '8px',
  position: 'relative',

  '&:hover': {
    background: theme.palette.background.default,
    borderRadius: '8px',

    '& .MuiButtonBase-root': {
      visibility: 'visible',
      opacity: '1',
    },
  },

  '& .MuiButtonBase-root': {
    padding: '0',
    width: '48px',
    minWidth: '0',
    position: 'absolute',
    top: '117px',
    right: '28px',
    zIndex: '1',
    visibility: 'hidden',
    opacity: '0',
    transition: 'opacity 0.5s',
  },

  [theme.breakpoints.down('sm')]: {
    width: '148px',
    padding: '8px',
  },
}));

const StyledAvatar = styled(Avatar)({
  width: '100%',
  height: 'auto',
  aspectRatio: '1 / 1',
});

const StyledTypography = styled(Typography)({
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

const LoadingMessage = styled('p')(({ theme }) => ({
  margin: '0',
  color: theme.palette.primary.main,
  fontWeight: '700',
}));
