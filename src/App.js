import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import NavBar from "./NavBar";
import Login from "./Login";
import SpotifyLogin from "./SpotifyLogin";
import Rdirect from "./Rdirect";
import Playlist from "./Playlist";
import PlaylistTracks from "./PlaylistTracks";
import Artist from "./Artist";
import ArtistTracks from "./ArtistTracks";
import AlbumTracks from "./AlbumTracks";
import Album from "./Album";
import Profile from "./Profile";
import { withRouter } from "react-router-dom";
import Home from "./Home";

function App() {
  const Main = withRouter(({ location }) => {
    return (
      <div>
        {
          location.pathname !== "/" && location.pathname !== "/login" && <NavBar />
        }
      </div>
    )
  })
  return (
    <Router>
      <Main />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={SpotifyLogin} />
        <Route path="/aboutMe" component={Profile} />
        <Route path="/redirect" component={Rdirect} />
        <Route path="/home" component={Home} />
        <Route path="/playlist" exact component={Playlist} />
        <Route path="/playlistTrack/:id" component={PlaylistTracks} />
        <Route path="/searchAlbum" component={Album} />
        <Route path="/albumTracks/:id" component={AlbumTracks} />
        <Route path="/searchArtist" component={Artist} />
        <Route path="/artistTopTracks/:id" component={ArtistTracks} />
      </Switch>
    </Router>
  )
}

export default App;

