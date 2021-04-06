import React from "react"
import Spotify from 'spotify-web-api-js';
import ls from 'local-storage';
import Quiz from "./Quiz";
const SpotifyWebApi = new Spotify();
const AT = ls.get('accessToken');
class ArtistTracks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listId: this.props.match.params.id,
            songs: [],
            displayResult: false
        }
    }
    componentDidMount() {
        SpotifyWebApi.setAccessToken(AT);
        this.getSongs();
    }
    getSongs() {
        SpotifyWebApi.getArtistTopTracks(this.state.listId, "IN")
            .then((response) => {
                response.tracks.map((item) => {
                    this.setState({
                        songs: [...this.state.songs,
                        {
                            id: item.id,
                        }
                        ],
                    })
                })
                this.setState({
                    displayResult: true
                })
            });
    }
    render() {
        return (
            <div>
                {this.state.displayResult ?
                    <div>
                        {ls.set('quizType', 'Artist Top Tracks')}
                        <Quiz arr={this.state.songs} quizID={this.state.listId} />
                    </div>
                    : null
                }
            </div>
        )
    }
}
export default ArtistTracks;