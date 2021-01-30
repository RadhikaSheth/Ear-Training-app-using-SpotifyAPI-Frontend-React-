import React from "react"
import Spotify from 'spotify-web-api-js';
import "./App.css"
import {Container,Row,Col,Card,Button} from 'react-bootstrap';
import ls from 'local-storage';
const SpotifyWebApi = new Spotify();
const AT = ls.get('accessToken');
class Home extends React.Component{
    componentDidMount(){
        SpotifyWebApi.setAccessToken(AT);
    }
    render(){
        return(
            <Container fluid style={{backgroundColor:"#f8f9f5"}}>
                    <Row xs={1} md={3} >
                        <Col className="card1">
                            <Card className="text-center" >
                            <Card.Body className="card1-body">
                                <Card.Text>
                                    Get through your personal favorites!
                                </Card.Text>
                                <Button href="/playlist" className="b-w" variant="outline-dark" ><b>PLAYLIST</b></Button>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col className="card1">
                            <Card className="text-center">
                            <Card.Body className="card1-body">
                                <Card.Text>
                                    Choose your favorite AlbumTracks
                                </Card.Text>
                                <Button href="/searchAlbum" className="b-w" variant="outline-dark" ><b>ALBUM</b></Button>
                            </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col className="card1">
                            <Card className="text-center">
                            <Card.Body className="card1-body">
                                <Card.Text>
                                    Go for your favorite Artist!
                                </Card.Text>
                                <Button href="/searchArtist" className="b-w" variant="outline-dark" ><b>ARTIST</b></Button>
                            </Card.Body>
                            </Card>
                        </Col>
                    
                    </Row>
                </Container>
        )
    }
    
    
}
export default Home;