import React from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange=this.handleNameChange.bind(this);
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value);
  }

//in het input element stond eerst defaultValue ={this.props.playListname}. Bij het saven bleef dan echter
//echter de nieuwe naam staan. defaultValue vervangen door value en ook type attribuut toegevoegd: werkt goed nu.
//in stap 21 van dit project wordt juist value door defaultValue vervangen, vreemd?
  render () {
    return (
      <div className="Playlist">
        <input value={this.props.playlistName} type="text" onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
};
