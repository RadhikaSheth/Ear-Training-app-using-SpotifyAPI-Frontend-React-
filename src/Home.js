import React from "react"
import Spotify from 'spotify-web-api-js';
import "./App.css"
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ls from 'local-storage';

const SpotifyWebApi = new Spotify();
const AT = ls.get('accessToken');

class Home extends React.Component {
    componentDidMount() {
        SpotifyWebApi.setAccessToken(AT);
        SpotifyWebApi.getMe()
            .then((response) => {
                ls.set('userID', response.id)
            })
    }
    render() {
        return (
            <div className="defaultBackground">
                <Container fluid="true" >
                    <Row xs={1} md={3} >
                        <Col className="cardDisplay">
                            <Card className="text-center" >
                                <Card.Body className="cardBody">
                                    <Card.Text>
                                        Get through your personal favorites!
                                </Card.Text>
                                    <Button href="/playlist" className="cardButton" variant="outline-dark" ><b>PLAYLIST</b></Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="cardDisplay">
                            <Card className="text-center">
                                <Card.Body className="cardBody">
                                    <Card.Text>
                                        Choose your favorite AlbumTracks
                                </Card.Text>
                                    <Button href="/searchAlbum" className="cardButton" variant="outline-dark" ><b>ALBUM</b></Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col className="cardDisplay">
                            <Card className="text-center">
                                <Card.Body className="cardBody">
                                    <Card.Text>
                                        Go for your favorite Artist!
                                </Card.Text>
                                    <Button href="/searchArtist" className="cardButton" variant="outline-dark" ><b>ARTIST</b></Button>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }


}
export default Home;