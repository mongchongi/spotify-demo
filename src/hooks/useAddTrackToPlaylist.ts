import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addItemsToPlaylist } from '../apis/playlistApi';
import { PAGE_LIMIT } from '../configs/commonConfig';

const useAddTrackToPlaylist = (playlist_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trackUri: string) => {
      return addItemsToPlaylist(playlist_id, [trackUri]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user-playlists'] });
      queryClient.invalidateQueries({ queryKey: ['playlist-items', { playlist_id, limit: PAGE_LIMIT }] });
      queryClient.invalidateQueries({ queryKey: ['playlist-detail', playlist_id] });
      console.log('success');
    },
  });
};

export default useAddTrackToPlaylist;
