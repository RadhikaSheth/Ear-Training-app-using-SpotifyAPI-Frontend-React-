import React from "react"
import Spotify from 'spotify-web-api-js';
import ls from 'local-storage';
import axios from "axios"
import UserIcon from "./icon/usericon.jpg";
import Chart from "react-google-charts";
import { Container, Row, Col, Image, Table } from "react-bootstrap";
const SpotifyWebApi = new Spotify();
const AT = ls.get('accessToken');
const userID = ls.get('userID');
class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userProfile: [],
            skippedSum: '',
            corrSum: '',
            incorrSum: '',
            userName: ''
        }
    }
    componentDidMount() {
        SpotifyWebApi.setAccessToken(AT);
        axios.get('https://ear-training-app-backend.herokuapp.com/user', {
            params: {
                userId: userID,
                accessToken: AT
            }
        })
            .then((response) => {
                var correctSum = 0;
                var incorrectSum = 0;
                var songs = 0;
                var skippedSum = 0;
                response.data.map((item) => {
                    correctSum += item.correctVal;
                    incorrectSum += item.incorrectVal;
                    skippedSum += item.skippedVal;
                    songs += item.correctVal + item.incorrectVal + item.skippedVal;
                    this.setState({
                        skippedSum: skippedSum,
                        corrSum: correctSum,
                        incorrSum: incorrectSum,
                        totalSongs: songs,
                        userProfile: [...this.state.userProfile,
                        {
                            quizDate: item.quizDate,
                            quizId: item.quizId,
                            quizType: item.quizType,
                            correct: item.correctVal,
                            incorrect: item.incorrectVal,
                            skipped: item.skippedVal
                        }
                        ],
                    })
                })
            })
            .catch((err) => {
                console.log(err);
            })
        this.init();
    }
    init() {
        SpotifyWebApi.getMe(userID)
            .then((response) => {
                var img = '';
                if (response.images.length === 0) {
                    img = UserIcon;
                } else {
                    img = response.images[0].url;
                }
                this.setState({
                    userName: response.display_name,
                    userImage: img,
                    result: true,
                })
            });

    }

    render() {
        var arr = Array.from(Array(this.state.userProfile.length + 1), () => new Array(4));
        arr[0] = ['DATE', 'CORRECT', 'INCORRECT', 'SKIPPED'];
        var index = 1;
        this.state.userProfile.map((item) => {
            arr[index] = [item.quizDate, item.correct, item.incorrect, item.skipped]
            index++;
        })
        var isprofile = false;
        if (this.state.userProfile.length === 0) {
            isprofile = false;
        } else {
            isprofile = true;
        }
        index = 0;
        return (
            <div>
                {this.state.result ?
                    <>
                        <Container fluid="true">
                            <Row style={{ paddingTop: "1%", backgroundColor: "#3d7475" }}>
                                <Col style={{ marginLeft: "5%", textAlign: "right" }} >
                                    <p style={{ color: "white", fontSize: "110%", paddingRight: "4%" }}>Hello {this.state.userName} &nbsp;<span style={{ fontSize: "110%" }}>|</span>
                            &nbsp;&nbsp;<Image src={this.state.userImage} roundedCircle height="60px" width="60px" /></p>
                                </Col>
                            </Row>
                        </Container>
                        <br />
                        {isprofile ?
                            <Container>
                                <Row xs={1} md={2} >
                                    <Col style={{ textAlign: "right" }}>
                                        <Chart

                                            chartType="PieChart"
                                            loader={<div>Loading Chart</div>}
                                            options={{
                                                chartArea: { width: "90%", height: "90%" },
                                                slices: [
                                                    {
                                                        color: "#2BB673"
                                                    },
                                                    {
                                                        color: "#d91e48"
                                                    },
                                                    {
                                                        color: "#007fad"
                                                    }
                                                ],
                                                legend: 'none',
                                            }}
                                            data={[
                                                ['Task', 'Quiz Result'],
                                                ['Correct', this.state.corrSum],
                                                ['Incorrect', this.state.incorrSum],
                                                ['Skipped', this.state.skippedSum],
                                            ]}
                                        />
                                    </Col>
                                    <Col>
                                        <Chart
                                            width="100%"
                                            height="110%"
                                            chartType="LineChart"
                                            loader={<div>Loading Chart</div>}
                                            data={arr}
                                            options={{
                                                chartArea: { top: "5%" },
                                                hAxis: {
                                                    title: 'Date',
                                                },
                                                vAxis: {
                                                    title: 'Songs',
                                                },
                                                legend: { position: 'bottom' },
                                                series: {
                                                    0: { color: '#2BB673' },
                                                    1: { color: '#d91e48' },
                                                    2: { color: '#007fad' },
                                                }
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <h4>QUIZ HISTORY</h4>
                                    <Table striped bordered hover >
                                        <thead>
                                            <tr>
                                                <th style={{ width: "20%" }}>#</th>
                                                <th style={{ width: "20%" }}>DATE</th>
                                                <th style={{ width: "20%" }}>TYPE</th>
                                                <th style={{ width: "20%" }}>SCORE</th>
                                                <th style={{ width: "20%" }}>TOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.state.userProfile.map((item) => {

                                                index++;
                                                return (
                                                    <tr>
                                                        <td>{index}</td>
                                                        <td>{item.quizDate}</td>
                                                        <td>{item.quizType}</td>
                                                        <td>{item.correct}</td>
                                                        <td>{item.skipped + item.correct + item.incorrect}</td>
                                                    </tr>
                                                )
                                            }
                                            )}

                                        </tbody>
                                    </Table>
                                </Row>
                            </Container>
                            :
                            <h2 style={{ textAlign: "center" }}>YOU HAVE NOT TESTED YOUR SKILLS YET!</h2>
                        }
                    </>
                    : null}
            </div>
        )
    }
}
export default Profile;