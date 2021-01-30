import React from "react"
import Spotify from 'spotify-web-api-js';
import ls from 'local-storage';
import Quiz from "./Quiz";
const SpotifyWebApi = new Spotify();
const AT = ls.get('accessToken');
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
        this.getUid();
    }
    getUid() {
        SpotifyWebApi.getMe()
            .then((response) => {
                this.setState({
                    u_id: response.id,
                })
                this.getSongs();
            })
    }
    getSongs() {
        SpotifyWebApi.getPlaylistTracks(this.state.u_id, this.state.pid)
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
                    <Quiz arr={this.state.songs} />:
                    null
                }
            </div>
        )
    }
}
export default PlaylistTracks;