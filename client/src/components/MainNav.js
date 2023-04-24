import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {  getToken, isAdministrator, userName } from '../utils/tokenHelper';
import {   Cart3, CartFill, HouseDoorFill, ListCheck, PersonCheckFill, PersonCircle, Power } from 'react-bootstrap-icons';
import easecartlogo from '../images/easecartlogo.png';
import { Link } from "react-router-dom";

function MainNav() {
    const expand = 'sm';
    const token = getToken();
    const user = userName();
    console.log("user name",user);
    const isAdmin = isAdministrator();

    return (
        <div className='fixed-top'>
            <Navbar key="Mainnavbar" bg="warning" expand={expand} className="">
                <Container fluid>
                    <Navbar.Brand href="#"><img src={easecartlogo} alt="EaseCart" className='' width="100" height="30"/></Navbar.Brand>
            {!isAdmin && <>
            {token && <>
            
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
                                        onChange={(e) => {}}
                                    />
                                    <Button variant="outline-success">Search</Button>
                                </Form>
                                <Nav.Link href="/home"> <HouseDoorFill/>
                                <span className='d-inline d-sm-none'>&nbsp;Home</span>
                                 </Nav.Link>
                                <Nav.Link href="/cart"> <CartFill/>
                                <span className='d-inline d-sm-none'>&nbsp;Cart</span></Nav.Link>
                                <NavDropdown
                                    title={user}
                                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                                > 
                                    <NavDropdown.Item href="#action4">
                                    <PersonCheckFill/> <small>My Profile</small>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/cart">
                                    <Cart3/>   <small>My Cart</small>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/myorders">
                                     <ListCheck/>   <small>My Orders</small>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />

                                    <NavDropdown.Item href="/logout">
                                     <Power/>   <small>Sign Out</small>
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#action6">About Us</Nav.Link>
                            </Nav>

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                
            </>}
            {!token && <>
               
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            <img src={easecartlogo} alt="EaseCart" className='' width="100" height="30"/>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link className='bg-success rounded-3' href="/registration">Signup</Nav.Link>
                                {/* <Nav.Link href="#action6">About Us</Nav.Link> */}
                            </Nav>
                            

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                
            </>}
            </>}
            {isAdmin && <>
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
                            <Nav.Link className=''href='' > <PersonCircle/> {user} </Nav.Link>
                                <Nav.Link className='btn btn-outline-success rounded-3' href="/logout"> <Power/> Logout </Nav.Link>
                                
                            </Nav>
                        
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
            </>}
            </Container>
            </Navbar>
        </div>
    );
}

export default MainNav;