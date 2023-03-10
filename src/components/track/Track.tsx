import './Track.css';
import React from 'react';
import {Song} from '../../types/Song';

interface IProps {
  track: Song,
  isRemoval: boolean,
  addTrack: (track) => void,
  removeTrack: (track) => void
}

function Track(props: IProps) {
  const {track, isRemoval, addTrack, removeTrack} = props;

  const handleTrackAction = () => {
    return isRemoval ? removeTrack(track) : addTrack(track);
  }

  return(
    <div className="track">
      <div className="track-information">
        <h3>{track.name}</h3>
        <p>{track.artists} | {track.album}</p>
      </div>
      <button className="track-action" onClick={handleTrackAction}>{isRemoval ? '-' : '+'}</button>
    </div>
  )
}

export default Track;