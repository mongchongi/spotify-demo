import { useNavigate, useParams } from 'react-router';
import PlaylistItem from '../../common/components/PlaylistItem';
import type { SimplifiedPlaylist } from '../../models/playlist';

interface PlaylistProps {
  playlists: SimplifiedPlaylist[];
}

const Playlist = ({ playlists }: PlaylistProps) => {
  const navigate = useNavigate();

  const { id: currentId } = useParams<{ id: string }>();

  const handleNavigatePlaylistDetailPage = (id: string) => {
    navigate(`/playlist/${id}`);
  };

  return (
    <>
      {playlists.map((item) => (
        <PlaylistItem
          key={item.id}
          id={item.id || ''}
          image={(item.images && item.images[0].url) || null}
          name={item.name || ''}
          artistName={`Playlist • ${item.owner?.display_name}`}
          handleNavigatePlaylistDetailPage={handleNavigatePlaylistDetailPage}
          isActive={currentId === item.id}
        />
      ))}
    </>
  );
};

export default Playlist;
