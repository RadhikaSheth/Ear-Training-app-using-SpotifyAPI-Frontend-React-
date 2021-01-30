import React, { Component } from "react"
import Spotify from 'spotify-web-api-js';
import { Link } from "react-router-dom";
import { Button,Container, Col, Row} from "react-bootstrap"
import ls from 'local-storage';
const SpotifyWebApi = new Spotify();
const AT = ls.get('accessToken');
class Playlist extends React.Component {
    constructor() {
        super();
        this.state = {
            playlists: [],
        }
    }
    componentDidMount() {
        SpotifyWebApi.setAccessToken(AT);
        this.getPlaying();
    }
    getPlaying() {
        SpotifyWebApi.getUserPlaylists()
            .then((response) => {
                response.items.map((item) => {
                    this.setState({
                        playlists: [...this.state.playlists,
                        {
                            id: item.id,
                            name: item.name
                        }
                        ],
                    })
                })
            })
    }
    render() {
        return (
            <div>
                <br />
                
                <Container fluid >
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center d-inline-block"> <h3>CHOOSE THE PLAYLIST:</h3></Col>
                    </Row>
                </Container>
                <br />

                <Container fluid>
                    {this.state.playlists.map(item => (
                        <Row>
                            <Col className="mt-1" md={{ span: 6, offset: 3 }}>
                            <Link to={`/playlistTrack/${item.id}`} style={{ textDecoration: 'inherit' }}>
                                <Button fluid variant="dark"style={{backgroundColor:"#9ca9aa",border:"none"}} size="lg" block>{item.name}</Button>
                            </Link>
                            </Col>
                        </Row>
                    ))} 
                </Container>
            </div>
        )
    }
}
export default Playlist;