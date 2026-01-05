import type {
  AddItemsToPlaylistResponse,
  CreatePlaylistRequest,
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
  GetPlaylistRequest,
  Playlist,
} from '../models/playlist';
import api from '../utils/api';

export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get('/me/playlists', {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw new Error('fail to fetch current user playlists');
  }
};

export const getPlaylist = async (params: GetPlaylistRequest): Promise<Playlist> => {
  const response = await api.get(`/playlists/${params.playlist_id}`, {
    params,
  });

  return response.data;
};

export const getPlaylistItems = async (params: GetPlaylistItemsRequest): Promise<GetPlaylistItemsResponse> => {
  const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
    params,
  });

  return response.data;
};

export const createPlaylist = async (user_id: string, params: CreatePlaylistRequest): Promise<Playlist> => {
  try {
    const { name, playlistPublic, collaborative, description } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistPublic,
      collaborative,
      description,
    });

    return response.data;
  } catch (error) {
    throw new Error('fail to create playlist');
  }
};

export const addItemsToPlaylist = async (
  playlist_id: string,
  trackUris: string[]
): Promise<AddItemsToPlaylistResponse> => {
  const response = await api.post(`/playlists/${playlist_id}/tracks`, {
    uris: trackUris,
    position: 0,
  });
  return response.data;
};
