import React from "react"
import Spotify from 'spotify-web-api-js';
import ls from 'local-storage';
import Quiz from "./Quiz";
const SpotifyWebApi = new Spotify();
const AT = ls.get('accessToken');
var userID = ls.get('userID');
class PlaylistTracks extends React.Component{
    constructor(props){
        super(props);
        this.state={
            pid: this.props.match.params.id,
            songs : [],
            res: false
        }
    }
    componentDidMount(){
        SpotifyWebApi.setAccessToken(AT);
        this.getSongs();
    }
    getSongs() {
        SpotifyWebApi.getPlaylistTracks(userID, this.state.pid)
            .then((response) => {
                response.items.map((item) => {
                    this.setState({
                        songs: [...this.state.songs,
                        {
                            id: item.track.id,
                            name: item.track.name,
                        }
                        ],
                    })
                })
                this.setState({
                    res : true,
                })
            });
        
    }
    render(){
        return(
            <div>
                {this.state.res ?
                    <div>
                    {ls.set('quizType','Playlist')}
                    <Quiz arr={this.state.songs} quizID={this.state.pid}/>
                    </div>
                    :null
                }
            </div>
        )
    }
}
export default PlaylistTracks;