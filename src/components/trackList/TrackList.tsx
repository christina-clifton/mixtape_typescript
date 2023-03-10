import './TrackList.css';
import Track from '../track/Track';
import React from 'react';
import {Song} from '../../types/Song';

interface IProps {
    tracklist: Song[],
    isRemoval: boolean,
    addTrack?: (track) => void,
    removeTrack?: (track) => void
  }

function TrackList(props: IProps) {

    const {tracklist, isRemoval, addTrack, removeTrack} = props;

    return(
        <div className="trackList">
            {tracklist.map((track) => {
                return (
                    <div key={track.id}>
                        <Track 
                            track={track}
                            isRemoval={isRemoval}
                            addTrack={addTrack}
                            removeTrack={removeTrack}
                        />
                    </div>
                )}
            )}
        </div>
    )
}

export default TrackList;