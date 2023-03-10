import React, {useState} from 'react';
import './App.css';

import SearchBar from '../searchBar/SearchBar';
import SearchResults from '../searchResults/SearchResults';
import Playlist from '../playlist/Playlist';
import CassetteIcon from '../../assets/cassette_icon.png';

// Connects to Spotify's API
import Spotify from '../../util/Spotify';         

function App() {

  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //Submits a new search, then saves the results to state
  const search = (term) => {                      
    Spotify.search(term)
    .then((newSearchResults) => {
      setSearchResults(newSearchResults);
    })
  }

  const renamePlaylist = (newName) => {
    setPlaylistName(newName);
  }

  const addTrack = (track) => {
    if(!playlistTracks.find((item) => item.id === track.id)) {
      setPlaylistTracks([...playlistTracks].concat(track));
    }
  }

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter((item) => item.id !== track.id));
  }

  //Saves user's playlist, then creates a new blank playlist
  const savePlaylist = () => {                    
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris)
    .then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([])
    });
  }

  return (
    <div className="app">
      <img src={CassetteIcon} alt="icon of a cassette" id="app-cassette-icon"/>
      <div className="app-searchbar">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={search}
        />
      </div>
      <div className="app-playlist">
        <SearchResults 
          searchResults={searchResults}
          addTrack={addTrack}
        />
        <Playlist 
          playlistName={playlistName}
          renamePlaylist={renamePlaylist}
          playlistTracks={playlistTracks}
          removeTrack={removeTrack}
          savePlaylist={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;