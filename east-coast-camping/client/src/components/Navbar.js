import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'

function NavTab({ currentPage, handlePageChange }) {
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
                        <Nav.Link href="/"
                            onClick={() => handlePageChange('Home')}
                            // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                            className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
                        >Home</Nav.Link>

                        <Nav.Link href="#contact"
                            onClick={() => handlePageChange('Contact')}
                            // Check to see if the currentPage is `Contact`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
                            className={currentPage === 'Contact' ? 'nav-link active' : 'nav-link'}
                        >Contact</Nav.Link>

                        {/* <Nav.Link href="#Page">Page</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Nav>
                        <Nav.Link href="#Login" className='login' >Login</Nav.Link>
                        <Nav.Link href="#signup" className='sign-up'>signup</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavTab;