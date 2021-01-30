import React from "react";
import Spotify from 'spotify-web-api-js';
import "./App.css";
import ls from 'local-storage';
import Modal from 'react-modal';
import {Container, Row, Col,Button, Form,Card,Toast} from 'react-bootstrap';
import Image from "./bg001.jpg";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//for importing piano
import DimensionsProvider from './DimensionsProvider.js';
import SoundfontProvider from './SoundfontProvider';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';
const noteRange = {
    first: MidiNumbers.fromNote('c3'),
    last: MidiNumbers.fromNote('f4'),
};
function ResponsivePiano(props) {
    return (
      <DimensionsProvider>
        {({ containerWidth, containerHeight }) => (
          <SoundfontProvider
            instrumentName="acoustic_grand_piano"
            audioContext={audioContext}
            hostname={soundfontHostname}
            render={({ isLoading, playNote, stopNote }) => (
              <Piano
                noteRange={noteRange}
                width={containerWidth}
                height={containerHeight}
                playNote={playNote}
                stopNote={stopNote}
                disabled={isLoading}
                {...props}
              />
            )}
          />
        )}
      </DimensionsProvider>
    );
}
var viewportWidth  = document.documentElement.clientWidth;
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
Modal.setAppElement(document.getElementById('root'));
toast.configure()

const SpotifyWebApi = new Spotify();
const AT = ls.get('accessToken');
class Quiz extends React.Component {
    constructor(props) {
        super(props);   
        this.state = {  
            api_key: 0,
            api_mode:0,
            correct :0,
            incorrect:0,
            key:0,
            mode:1,
            url: '',
            bigview : true,
            song: [],
            index: 0,
            idd: '',
            final:false,
            piano:false,
            pbut:'Open Piano'
        }
    }
    componentDidMount() {
        SpotifyWebApi.setAccessToken(AT);
        this.init();
    }
    init(){  
        var ar= [];
        this.props.arr.map((item) =>{
            var obj = {};
            obj["id"] = item.id;
            obj["taken"] = false;
            ar.push(obj);
        })
        var view;
        if(viewportWidth <= 519){
            view = false;
        }else{
            view=true;
        }
        this.setState({
            bigview:view,
            song: ar,
        },()=>{
            this.seturl();
            
        })
    }
    seturl(){
        if(this.state.song.length !==0){
            this.setState({
                url: 'https://open.spotify.com/embed/track/' + this.state.song[0].id,
                idd: this.state.song[0].id
            })
        }
    }
    finalResult(){
        this.setState({
            final:true
        })
    }
    playNext() {
        var tid='';
        var temperory_index = 0;
        if(this.state.index == this.state.song.length-1){
            this.finalResult();
        } else {
            temperory_index = this.state.index+1;
            tid = this.state.song[temperory_index].id
            var url2 = 'https://open.spotify.com/embed/track/' + tid;
            this.setState(
            {
                index : temperory_index,
                url: url2,
                idd: this.state.song[temperory_index].id,
            }); 
        }
        
    }
    generateResult(){
        if(this.state.song[this.state.index].taken===false){
            var res1 = this.state.correct;
            var res2 = this.state.incorrect;
            if(this.state.api_key == this.state.key && this.state.api_mode == this.state.mode){
                res1 += 1;
                toast("CORRECT!",{
                    autoClose:1500,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else{
                res2 +=1;
                toast("INCORRECT!",{
                    autoClose:2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            let song = [...this.state.song];
            let s = {
                ...song[this.state.index],
                taken: true
            }
            song[this.state.index] = s;
            this.setState({
                correct : res1,
                incorrect: res2,
                song
            }, () => {
                
                if(this.state.api_key == this.state.key && this.state.api_mode == this.state.mode){
                    this.playNext();
                }
            })
        }else{
            if(this.state.api_key == this.state.key && this.state.api_mode == this.state.mode){
                this.playNext();
                toast("Correct! But score won't be counted",{
                    autoClose:2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else{
                toast("Keep Trying!",{
                    autoClose:2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }
    }
    getresult(){
        SpotifyWebApi.getAudioFeaturesForTrack(this.state.idd)
            .then((response) => {
                this.setState({
                        api_key: response.key,
                        api_mode:response.mode,
                    
                },()=>{
                    this.generateResult();
                })
            }) 
    }
    handleChange(event) {
        const key = event.target.name;
        const value = event.target.value;
        this.setState({ [key]: value });
    }
    handleSubmit(){
        if(this.state.song.length !=0){
            this.getresult();
        }
        
    }
    playPiano(){
        var pval = false;
        var p = '';
        if(this.state.piano){
            pval = false;
            p = "Open Piano"
        }else{
            pval = true;
            p = "Close Piano"
        }
        this.setState({
            piano:pval,
            pbut: p
        })
    }
    render() { 
        const p = "";
        return (
            <div style={{backgroundColor:"#f8f9f5"}}>
                <br />
                <Container fluid>
                    <Row xs={1} md={2}>
                        <Col className="ifr" fluid>
                            <br />
                            {this.state.bigview?
                                <iframe src={this.state.url} width="300" height="380" allowtransparency="true" allow="encrypted-media"></iframe>
                                :
                                <iframe src={this.state.url} width="360" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                            }
                            <br />
                            
                        </Col>
                        <Col className="mt-2 d-flex justify-content-center align-items-center d-inline-block">
                            <br />
                            <Form onSubmit={this.handleSubmit} style={{width:"85%"}}>
                                <Form.Group >
                                <Form.Label>{this.state.bigview ? <h4><b>WHATS THE KEY?</b></h4> : <h6><br/><b>WHATS THE KEY?</b></h6>}</Form.Label>
                                <br />
                                
                                <Form.Control as="select" name="key"  onChange={this.handleChange.bind(this)}>
                                    <option value="0">C</option>
                                    <option value="1">Db / C#</option>
                                    <option value="2">D</option>
                                    <option value="3">Eb</option>
                                    <option value="4">E</option>
                                    <option value="5">F</option>
                                    <option value="6">Gb / F#</option>
                                    <option value="7">G</option>
                                    <option value="8">Ab</option>
                                    <option value="9">A</option>
                                    <option value="10">Bb</option>
                                    <option value="11">B / Cb</option>
                                </Form.Control>
                                <br />
                                <Form.Control as="select" name="mode" mode={this.state.mode} onChange={this.handleChange.bind(this)}>
                                    <option value="1">Major</option>
                                    <option value="0">Minor</option>
                                </Form.Control>
                                <br />
                                <Row xs={1} md={3} className="mt-2 d-flex justify-content-center align-items-center d-inline-block" >
                                    <Col>
                                        <Button className="mt-2" style={{width:150}}variant="info"  onClick={this.handleSubmit.bind(this)} > 
                                            GUESS
                                        </Button>{' '}
                                    </Col>
                                    <Col>
                                        <Button className="mt-2" style={{width:150}}variant="dark" onClick={this.playNext.bind(this)} >
                                            SKIP
                                        </Button>{' '}
                                    </Col>
                                    <Col>
                                        <Button className="mt-2" style={{width:150}} variant="outline-dark" onClick={this.playPiano.bind(this)} >
                                            {this.state.pbut}
                                        </Button>{' '}
                                    </Col>
                                </Row>
                                <br />
                                <Row >
                                    <Col style={{overflow:"auto",display:"block",}}>
                                        {this.state.piano ?
                                            <ResponsivePiano /> : null
                                        }  
                                    </Col>
                                </Row>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row >
                        <Col className="mt-2 d-flex justify-content-center align-items-center d-inline-block">
                            <Card style={{ width: '20rem',textAlign:"center"}}>
                                <Card.Header style={{backgroundColor:"#3b3c36",color:"white",fontSize:"130%"}}><b>SCORE</b></Card.Header>
                                <Card.Body style={{backgroundColor:"white"}}>
                                <Card.Text>
                                CORRECT : {this.state.correct}
                                <br />
                                INCORRECT: {this.state.incorrect}
                                </Card.Text>
                            </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                {this.state.final? 
                    <Modal style={customStyles} isOpen={true}>
                        <Card style={{height:"400px",width:"500px"}}> 
                        <Card.Img src={Image} alt="Card image" />
                        <Card.ImgOverlay>
                        <Card.Title style={{textAlign:"center", color:"#4B9CD3", textShadow: "2px 2px 0px  white, -2px -2px 0px  white, 2px -2px 0px white, -2px 2px 0px  white"}}><b><h1>SCORE CARD</h1></b></Card.Title>
                        <Card.Text style={{textAlign:"center",marginTop:"100px"}}>
                            <h4 >
                                CORRECT :{this.state.correct}
                                <br />
                                INCORRECT :{this.state.incorrect}
                            </h4>
                        </Card.Text>
                        <div style={{textAlign:"center",marginTop:"100px"}}>
                            <Button href="/home" variant="outline-secondary" style={{width:"100px"}}>HOME</Button>
                            <Button onClick={() => window.location.reload(false)} variant="outline-secondary" style={{width:"100px"}} className="ml-3">RE-TEST</Button>
                        </div>
                        </Card.ImgOverlay>
                        </Card>
                    </Modal>
                    : null
                }
                <br />
            </div>
        )
    }
}
export default Quiz;