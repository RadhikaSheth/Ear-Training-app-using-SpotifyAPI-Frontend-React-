import React from "react";
import Spotify from 'spotify-web-api-js';
import { Link } from "react-router-dom";    
import { Button, Container } from "react-bootstrap"
import ls from 'local-storage';
import {Form, Row, Col} from "react-bootstrap";
import Img from "./icon.jpg"
import "./App.css"
const SpotifyWebApi = new Spotify();
const AT = ls.get('accessToken');
class Artist extends React.Component{
    constructor(props){
        super(props);
        this.state={
            query : '',
            list :[],
            res: false,
        }
    }
    componentDidMount(){
        SpotifyWebApi.setAccessToken(AT);
    }
    getAlbum(){
            SpotifyWebApi.searchArtists(this.state.query, { limit: 12})
            .then((response) => {
                this.state.list.length=0;
                response.artists.items.map((item) => {
                    var img='';
                    if(item.images.length ==0){
                        img =Img;
                    }else{
                        img = item.images[0].url;
                    }
                    this.setState({
                    list: [...this.state.list,
                            {
                                id: item.id,
                                name: item.name,
                                image : img
                            }
                        ],
                    })
                })
                this.setState({
                    res:true,
                })
            })
    }
    keyPress(e){
        if(e.key === 'Enter'){
            this.getAlbum();
            e.preventDefault();
        }
     }
    handleChange(event) {
        const key = event.target.name;
        const value = event.target.value;
        this.setState({ [key]: value });
    }
    render(){
        return(
             <div >
                 <br />
                <Container>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Control size="lg" type="text" name ="query" placeholder="Search Artist" onKeyDown={this.keyPress.bind(this)} onChange={this.handleChange.bind(this)} />
                            <Row className="rwid mt-2">
                                <Col style={{textAlign:"center"}}>
                                <Button style={{width:150}}variant="dark" size="lg" onClick={this.getAlbum.bind(this)}> Search</Button>{' '}
                                </Col>         
                            </Row>
                        </Form.Group>
                        </Col>
                    </Row>
                </Container>
                <Container>
                {this.state.res ?
                    <div>
                        {this.state.list.map((item) =>{
                            return (
                                <Link style={{ textDecoration: 'inherit' }} to={{pathname:`/artistTopTracks/${item.id}`,val:this.state.val}}  >
                                    <Row  className="dispItems" xs={1} md={2} >
                                    <Col style={{textAlign:"center"}}>
                                        <img src={item.image} height="200" width="200"/>
                                    </Col>
                                    <Col   style={{ textDecoration: 'inherit',color:"black"}}className="d-flex justify-content-center align-items-center d-inline-block">
                                    {item.name}
                                    </Col>
                                    </Row>
                                </Link>
                            )
                        })}
                    </div>
                    :null
                }
                </Container>
             </div>
        )
    }
}
export default Artist;