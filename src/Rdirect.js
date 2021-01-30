import React from "react"
import Spotify from 'spotify-web-api-js';
import ls from 'local-storage';
import Home from "./Home";

ls.set('isLoggedIn',true);
const SpotifyWebApi = new Spotify();
class Rdirect extends React.Component{
    constructor(){
        super();
        const params = this.getHashParams();
        if(params.access_token){
            SpotifyWebApi.setAccessToken(params.access_token)
        }
        ls.set('accessToken', params.access_token);
    }
    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
    render(){
        return(
            <Home />
        )
    }
}
export default Rdirect;
