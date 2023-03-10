import './Playlist.css';
import TrackList from '../trackList/TrackList';
import editIcon from '.././../assets/edit_icon.png'
import React from 'react';
import {Song} from '../../types/Song';

interface IProps {
  playlistName: string,
  renamePlaylist: (playlistName) => void,
  playlistTracks: Song[],
  removeTrack: (track) => void,
  savePlaylist: () => void
}

function Playlist(props: IProps) {
  const {playlistName, renamePlaylist, playlistTracks, removeTrack, savePlaylist} = props;

  return(
    <div className="playlist">
      <div className="playlist-name">
        <input defaultValue={playlistName} onChange={(e) => renamePlaylist(e.target.value)}/>
        <img className="edit-icon" alt="edit playlist name icon" src={editIcon}></img>
      </div>
      <TrackList 
        tracklist={playlistTracks}
        isRemoval={true}
        removeTrack={removeTrack}
      />
      <button className="playlist-save" onClick={() => savePlaylist()}>SAVE TO SPOTIFY</button>
    </div>
  )
}

export default Playlist;
