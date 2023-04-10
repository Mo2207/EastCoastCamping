import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'


function NavTab() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="white" className='text-dark'>
            <Container fluid>
                <Navbar.Brand>
                    <img
                        src="https://user-images.githubusercontent.com/112873819/230617279-ee879b3f-5e22-437f-a992-66d5df081bf5.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="logo"
                    />
                </Navbar.Brand>
                <Navbar.Brand>𝐄𝐚𝐬𝐭𝐂𝐨𝐚𝐬𝐭𝐂𝐚𝐦𝐩𝐢𝐧𝐠</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                    <Nav>

                        <Nav.Link href="/MyBookings" className='login' >My Bookings</Nav.Link>
                        <Nav.Link href="/Profile" className='login' >Profile</Nav.Link>
                        <Nav.Link href="/Login" className='login' >Login</Nav.Link>
                        <Nav.Link href="/Login" className='login' >Logout</Nav.Link>                        
                        <Nav.Link href="/signup" className='sign-up'>signup</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavTab;