import { List, ListItem, ListItemButton, styled, Typography } from '@mui/material';
import { PAGE_LIMIT } from '../../../configs/commonConfig';
import useGetCurrentUserPlaylists from '../../../hooks/useGetCurrentUserPlaylists';
import type { Playlist } from '../../../models/playlist';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addItemsToPlaylist } from '../../../apis/playlistApi';

interface PlaylistModalProps {
  trackUri: string | undefined;
  onClose: () => void;
  onSuccess: () => void;
}

const PlaylistModal = ({ trackUri, onClose, onSuccess }: PlaylistModalProps) => {
  const { ref, inView } = useInView();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({
    limit: PAGE_LIMIT,
    offset: 0,
  });

  const queryClient = useQueryClient();
  const { mutate: addTrack } = useMutation({
    mutationFn: ({ pId, tUri }: { pId: string; tUri: string }) => addItemsToPlaylist(pId, [tUri]),
    onSuccess: (_data, variables) => {
      const { pId } = variables;

      queryClient.invalidateQueries({ queryKey: ['current-user-playlists'] });
      queryClient.invalidateQueries({ queryKey: ['playlist-items', { pId, limit: PAGE_LIMIT }] });
      queryClient.invalidateQueries({ queryKey: ['playlist-detail', pId] });

      onClose();
      onSuccess();
    },
  });

  const playlists =
    data?.pages.flatMap((page) => page?.items ?? []).filter((track): track is Playlist => !!track) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <StyledList>
      {playlists.map((playlist, index) => (
        <ListItem key={`${index}_${playlist.id}`} sx={{ padding: '0' }}>
          <StyledListItemButton
            onClick={() => {
              if (playlist.id && trackUri) {
                addTrack({ pId: playlist.id, tUri: trackUri });
              }
            }}
          >
            <Typography variant='body1' sx={{ fontSize: '16px', fontWeight: '700' }}>
              {playlist.name}
            </Typography>
          </StyledListItemButton>
        </ListItem>
      ))}
      <ListItem ref={ref} sx={{ padding: '1px 16px' }}>
        {isFetchingNextPage && <LoadingMessage>Loading...</LoadingMessage>}
      </ListItem>
    </StyledList>
  );
};

export default PlaylistModal;

const StyledList = styled(List)(({ theme }) => ({
  position: 'absolute',
  top: '16px',
  right: '8px',
  zIndex: '10',
  width: '250px',
  height: '200px',
  background: theme.palette.background.default,
  padding: '0',
  borderRadius: '8px',
  overflowY: 'auto',
  boxShadow: 'rgb(28, 30, 42) 0px 2px 8px 0px',

  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.text.secondary,

  '&:hover': {
    background: 'rgba(167, 82, 246, 0.1)',
  },

  '&:hover p': {
    color: theme.palette.text.primary,
  },
}));

const LoadingMessage = styled('p')(({ theme }) => ({
  margin: '0',
  color: theme.palette.primary.main,
  fontWeight: '700',
}));
