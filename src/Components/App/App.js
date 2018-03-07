import React, { Component } from 'react';
import './App.css';
import {Playlist} from '../Playlist/Playlist';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults:[],
      playlistName:'New playlist',
      playlistTracks:[]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
      const notInPlaylist = this.state.playlistTracks.every(playlistTrack =>
        playlistTrack.id !== track.id);
      if (notInPlaylist) {
        this.setState({
          playlistTracks: this.state.playlistTracks.concat([track]),
        });
      }
    }

    removeTrack(track) {
      const mustKeepInPlaylist = this.state.playlistTracks.filter(playlistTrack =>
      playlistTrack.id !== track.id);
      this.setState({
        playlistTracks: mustKeepInPlaylist
      })
    }

    updatePlaylistName(name){
      this.setState({
        playlistName:name
      })
    }

//the savePlaylist method doesn't reset the playlistName, what is wrong (step95 instructions)? 
    savePlaylist(){
      let trackURIs = this.state.playlistTracks.map(track=>track.uri);
      Spotify.savePlaylist(this.state.playlistName,trackURIs).then(()=>{this.setState({
        searchResults:[],
        playlistName:'New playlist',
        playlistTracks:[]
      })
    });
    }

    search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch = {this.search}/>
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
              <Playlist playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
