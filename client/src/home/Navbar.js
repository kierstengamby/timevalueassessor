import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button,
    Container,
    Col,
    Row,
    NavbarText
} from 'reactstrap';
import './navbar.css';


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        if (localStorage.getItem('token')) {
            return (
                <Container fluid>
                    <Row className="title-page">
                        <Nav className="justify-content-end">
                            <Navbar className="nav" color="faded" light expand="md">
                                <NavbarBrand href="/"></NavbarBrand>
                                <NavbarToggler onClick={this.toggle} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <Button onClick={() => this.props.clickLogout()}>Logout</Button>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </Navbar>
                        </Nav>
                    </Row>
                </Container>
            )
        } else {
            return (
                <Container fluid>
                    <h1 id="header-title">Time Value Calculator</h1>
                    <Row className="title-page">
                        <Navbar className="nav" color="faded" light expand="md">
                            <NavbarBrand href="/" className="title-text"></NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </Row>
                    <Row id="title-page-subtitle">
                        <Col md="2"></Col>
                        <Col md="8">
                            <h5>This app is designed to allow you to track the time you spend on the most common tasks outside of your traditional work week, such as cleaning and cooking. The app takes into account your own valuation of your "non-work time" (i.e. the value of your neutral time) to assess whether you should outsource and pay for those tasks to be completed, or complete the tasks yourself.</h5>
                        </Col>
                        <Col md="2"></Col>
                    </Row>
                </Container>
            )
        };
    }
}


export default NavBar;