import React from "react"
import { Navbar, Nav } from "react-bootstrap";
var isprofile = false;
class NavBar extends React.Component {
    constructor() {
        super();
        if (window.location.pathname === '/aboutMe') {
            isprofile = true;
        } else {
            isprofile = false;
        }
    }
    render() {
        return (
            <Navbar fluid="true" collapseOnSelect style={{ backgroundColor: isprofile ? "#6eb5aa" : "#479c9d" }} variant="dark" expand="lg" >
                <Navbar.Brand href="/home"><b>MUSIC APP</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="mr-auto" >
                        <Nav.Link href="/playlist" ><b>PLAYLIST</b></Nav.Link>
                        <Nav.Link href="/searchAlbum"><b>ALBUM</b></Nav.Link>
                        <Nav.Link href="/searchArtist" ><b>ARTIST</b></Nav.Link>
                    </Nav>
                    <Nav className="ml-auto mr-5">
                        <Nav.Link href="/aboutMe"><b>PROFILE</b></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default NavBar;