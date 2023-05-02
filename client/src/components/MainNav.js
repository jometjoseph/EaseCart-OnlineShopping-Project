import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {  getToken, isAdministrator, userName } from '../utils/tokenHelper';
import {   Cart3, CartFill, HouseDoorFill, ListCheck, PersonCheckFill, PersonCircle, Power, Search } from 'react-bootstrap-icons';
import easecartlogo from '../images/easecartlogo.png';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchKey } from './Redux/cartslice';

function MainNav(props) {
    const expand = 'sm';
    const token = getToken();
    const user = userName();
    console.log("user name",user);
    const isAdmin = isAdministrator();
    const navigate = useNavigate();
    const [searchBox,setSearchBox] = useState(false);
    const dispatch = useDispatch();
    var result = useSelector(state => state.easeCart.searchKey);
    const [searchText, setSearchText] = useState('');

  const handleChange = (event) => {
    setSearchText(event.target.value);
    props.onSearch(event.target.value);
  }

    // const searchBoxsetter = (value) => {
    //     // navigate('/allProducts');
    //     // setSearchBox(true);
    //     dispatch(setSearchKey(value));
    //     console.log("search key",result)

    // }

    return (
        <div className='fixed-top'>
            {token && <>
            {!isAdmin && <>
                <Navbar key="Mainnavbar" bg="warning" expand={expand} className="">
                <Container fluid>
                    <Navbar.Brand href="#"><img src={easecartlogo} alt="EaseCart" className='' width="100" height="30"/></Navbar.Brand>
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
                                    {/* {searchBox === true ? <>
                                        <Form.Control
                                        type="search"
                                        placeholder="🔍Search"
                                        className="me-2"
                                        aria-label="Search"
                                        onChange={(e) => {}}
                                    /> */}
                                    {/* <Button variant="outline-dark"> <Search/> </Button> */}
                                    {/* </> : <> */}
                                    <Form.Control
                                        type="search"
                                        placeholder="🔍Search"
                                        className="me-2"
                                        aria-label="Search"
                                        onChange={(e) => {handleChange(e)}}
                                    />
                                    
                                    {/* <Button variant="outline-dark" onClick={() => {}}> <Search/> </Button> */}
                                    {/* </>} */}
                                    
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
                    </Container>
            </Navbar>
                
            </>}
            {isAdmin && <>
                <Navbar key="Mainnavbar" bg="warning" expand={expand} className="">
                <Container fluid>
                    <Navbar.Brand href="#"><img src={easecartlogo} alt="EaseCart" className='' width="100" height="30"/></Navbar.Brand>
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
                    </Container>
            </Navbar>
            </>}
            </>}
            {!token && <>
            <Navbar key="Mainnavbar" bg="white" expand={expand} className="">
                <Container fluid>
                    <Navbar.Brand href="#"><img src={easecartlogo} alt="EaseCart" className='' width="100" height="30"/></Navbar.Brand>
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
                    </Container>
            </Navbar>
            </>}
        </div>
    );
}

export default MainNav;