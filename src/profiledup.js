import React from "react"
import Spotify from 'spotify-web-api-js';
import ls from 'local-storage';
import axios from "axios"
import { Container,Row,Col } from "react-bootstrap";
const SpotifyWebApi = new Spotify();
const AT = ls.get('accessToken');
const userID = ls.get('userID');
class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userProfile:[],
            corrSum : '',
            incorrSum : '',
            totalSongs : '',
            userName: ''
        }
    }
    componentDidMount(){
        SpotifyWebApi.setAccessToken(AT);
        axios.get('http://localhost:8080/user',{
            params: {
                userId : userID
            }
        })
        .then((response) => {
            var correctSum=0;
            var incorrectSum =0;
            var songs =0;
            response.data.map((item)=>{
                correctSum += item.correctVal;
                incorrectSum += item.incorrectVal;
                songs += item.correctVal + item.incorrectVal + item.skippedVal;
                this.setState({
                    corrSum : correctSum,
                    incorrSum : incorrectSum,
                    totalSongs : songs,
                    userProfile: [...this.state.userProfile,
                    {
                        quizId : item.quizId,
                        quizType : item.quizType,
                        correct : item.correctVal,
                        incorrect : item.incorrectVal,
                        skipped : item.skippedVal
                    }
                    ],
                })
            })
            console.log(response.data);
        })
        .catch((err) =>{
            console.log(err);
        })
        this.init();
    }
    init(){
        SpotifyWebApi.getMe(userID)
        .then((response) => {
            this.setState({
                userName : response.display_name
            })
        });
    }
    render(){
        return(
            <div>
                <Container >
                    <Row className="d-flex align-items-center d-inline-block" style={{height:"200px"}}>
                        <h1>Hello {this.state.userName}!</h1>
                        <Col>
                            <Row>
                                ATTEMPTED:
                            </Row>
                            <Row>
                                {this.state.userProfile.length}
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <p>Total quiz : {this.state.userProfile.length}</p>
                <p>correct % : {this.state.corrSum/this.state.totalSongs}</p>
                <p>incorrect % :{this.state.incorrSum/this.state.totalSongs}</p>
                {this.state.userProfile.map((item)=>{
                    return (<div>
                    <h6>{item.quizId}</h6>
                    <h6>{item.quizType}</h6>
                    <h6>{item.correct}</h6>
                    <h6>{item.incorrect}</h6>
                    <h6>{item.skipped}</h6>
                    </div>
                    )
                }
                )}
            </div>
        )
    }
}
export default Profile;