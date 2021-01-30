import React from "react";
import { Button,Container, Col, Row} from "react-bootstrap"
class Login extends React.Component{
    render(){
        return(
                <Container fluid style={{backgroundColor:"#f8f9f5"}}>
                    <Row>
                        <Col  className="d-flex justify-content-center align-items-center d-inline-block" style={{backgroundColor:"	#479c9d" ,color:"white"}}>
                            <h3>THE MUSIC APP</h3 >
                        </Col>
                    </Row>
                    <Row style={{marginTop:"15%"}} xs={1} md={2}>
                        <Col className=" d-flex justify-content-center align-items-center">
                        <h3><b>TRAIN YOUR EARS!
                        <br />
                        HEAR THE SONG AND GUESS THE KEY! <br /><br /></b></h3>
                        </Col>
                        <Col className=" d-flex justify-content-center align-items-center">
                                <Button variant="outline-dark" style={{width:"350px"}} href = "/login" onClick={this.handleClick} size="lg">LOGIN WITH SPOTIFY </Button>
                        </Col>
                    </Row>
                </Container>
        )
    }

}
export default Login;