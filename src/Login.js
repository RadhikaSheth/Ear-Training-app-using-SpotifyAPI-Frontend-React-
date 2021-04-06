import React from "react";
import { Button, Container, Col, Row } from "react-bootstrap"
class Login extends React.Component {
    render() {
        return (
            <Container fluid="true" className="defaultBackground" >
                <Row>
                    <Col className="defaultNav">
                        <h3 className="v_align" >THE MUSIC APP</h3 >
                    </Col>
                </Row>
                <Row xs={1} md={2}>
                    <Col style={{ textAlign: "center", marginTop: "15%" }}>
                        <h3><b>TRAIN YOUR EARS!
                        <br />
                        HEAR THE SONG AND GUESS THE KEY! <br /></b></h3>
                    </Col>
                    <Col style={{ textAlign: "center", marginTop: "15%" }}>
                        <Button variant="outline-dark" style={{ width: "350px" }} href="/login" onClick={this.handleClick} size="lg">LOGIN WITH SPOTIFY </Button>
                    </Col>
                </Row>
            </Container>
        )
    }

}
export default Login;