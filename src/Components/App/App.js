import React from 'react';
import './App.css';
import {Playlist} from './Playlist/Playlist';
import {SearchResults} from './SearchResults/SearchResults';
import {SearchBar} from './Search Bar/SearchBar'
import Spotify from '../../util/spotify'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults : [],
      playlistName : 'My Playlist',
      playlistTracks : []
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack =this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  search(term){
    Spotify.search(term).then(searchResults=>{
      this.setState({searchResults: searchResults
      })
    })
  }

  savePlaylist()
{
  const trackUris = this.state.playlistTracks.map(track => track.uri)
  Spotify.savePlaylist(this.state.playlistName, trackUris).then(()=>{
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks : []
    })
  })

}
  updatePlaylistName(name){
    this.setState({playlistName:name})
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTracks => savedTracks.id === track.id)){
      return;
    }
        tracks.push(track)
        this.setState({playlistTracks : tracks})
      }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currenttrack=> currenttrack.id !== track.id)
    this.setState({playlistTracks:tracks})
  }

  render(){
    return( 
    <div>
    <h1>Find<span className="highlight">Your</span>Jamm</h1>
    <div className="App">
      <SearchBar onSearch = {this.search}/>
      <div className="App-playlist">
        <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack}/>
        <Playlist playlistname = {this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove = {this.removeTrack} onNameChange = {this.updatePlaylistName} onSave = {this.savePlaylist}/>
      </div>
    </div>
  </div>
    )
  }
}


export default App;
