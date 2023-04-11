import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {  getToken } from '../utils/tokenHelper';

function MainNav() {
    const expand = 'sm';
    const token = getToken();
    
    return (
        <div className='fixed-top'>
            {token && <>
            <Navbar key="Mainnavbar" bg="warning" expand={expand} className="">
                <Container fluid>
                    <Navbar.Brand href="#">EaseCart</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                EaseCart
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success">Search</Button>
                                </Form>
                                <Nav.Link href="#h">Home</Nav.Link>
                                <Nav.Link href="/cart">Cart</Nav.Link>
                                <NavDropdown
                                    title="Actions"
                                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                                >
                                    <NavDropdown.Item href="#action4">
                                        My Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/cart">
                                        Cart
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/registration">
                                        Registration
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />

                                    <NavDropdown.Item href="/Logout">
                                        SignOut
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#action6">About Us</Nav.Link>
                            </Nav>

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

           
                {/* <Navbar key="secnavbar" bg="light" expand={expand} className="mt-6">
                    <Container fluid>
                        <Navbar.Brand href="#">EaseCart</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    EaseCart
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                               
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar> */}
                

            </>}

        </div>
    );
}

export default MainNav;