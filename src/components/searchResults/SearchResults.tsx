import './SearchResults.css';
import TrackList from '../trackList/TrackList';
import React from 'react';
import {Song} from '../../types/Song';


interface IProps {
  searchResults: Song[],
  addTrack: (track) => void,
}

function SearchResults(props: IProps) {
  const {searchResults, addTrack} = props;

  return (
    <div className="searchResults">
      <h2>Results</h2>
        <TrackList 
          tracklist={searchResults}
          isRemoval={false}
          addTrack={addTrack}
        />
    </div>
  )
}

export default SearchResults;
