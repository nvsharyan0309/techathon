import React, { useState, useEffect, useRef } from 'react';

interface Song {
  title: string;
  artist: string;
  url: string;
  genre: string;
}

const Music: React.FC = () => {
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [newSong, setNewSong] = useState({ title: '', artist: '', url: '', genre: '' });
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeGenre, setActiveGenre] = useState('all');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedPlaylist = localStorage.getItem('playlist');
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  const addToPlaylist = () => {
    if (newSong.title && newSong.artist && newSong.url && newSong.genre) {
      setPlaylist([...playlist, newSong]);
      setNewSong({ title: '', artist: '', url: '', genre: '' });
    }
  };

  const removeFromPlaylist = (index: number) => {
    const updatedPlaylist = playlist.filter((_, i) => i !== index);
    setPlaylist(updatedPlaylist);
    if (currentSong === playlist[index]) {
      setCurrentSong(null);
      setIsPlaying(false);
    }
  };

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.play();
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const filteredPlaylist = activeGenre === 'all'
    ? playlist
    : playlist.filter(song => song.genre === activeGenre);

  const genres = ['all', ...new Set(playlist.map(song => song.genre))];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Music</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Add to Playlist</h3>
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            className="px-3 py-2 border rounded"
            placeholder="Enter song title"
          />
          <input
            type="text"
            value={newSong.artist}
            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
            className="px-3 py-2 border rounded"
            placeholder="Enter artist name"
          />
          <input
            type="text"
            value={newSong.url}
            onChange={(e) => setNewSong({ ...newSong, url: e.target.value })}
            className="px-3 py-2 border rounded"
            placeholder="Enter song URL"
          />
          <input
            type="text"
            value={newSong.genre}
            onChange={(e) => setNewSong({ ...newSong, genre: e.target.value })}
            className="px-3 py-2 border rounded"
            placeholder="Enter genre"
          />
          <button
            onClick={addToPlaylist}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Playlist
          </button>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Genres</h3>
        <div className="flex space-x-2">
          {genres.map(genre => (
            <button
              key={genre}
              className={`px-3 py-1 rounded ${activeGenre === genre ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveGenre(genre)}
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Your Playlist</h3>
        {filteredPlaylist.length > 0 ? (
          <ul className="list-disc list-inside">
            {filteredPlaylist.map((song, index) => (
              <li key={index} className="flex items-center justify-between mb-2">
                <span>{song.title} - {song.artist} ({song.genre})</span>
                <div>
                  <button
                    onClick={() => playSong(song)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                  >
                    Play
                  </button>
                  <button
                    onClick={() => removeFromPlaylist(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your playlist is empty. Add some songs!</p>
        )}
      </div>
      {currentSong && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="text-xl font-semibold mb-2">Now Playing</h3>
          <p>{currentSong.title} - {currentSong.artist}</p>
          <audio ref={audioRef} />
          <div className="mt-2">
            <button onClick={togglePlayPause} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button onClick={stopSong} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Music;
