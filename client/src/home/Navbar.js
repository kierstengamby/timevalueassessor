import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button
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
                <div>
                    <Navbar className="nav" color="faded" light expand="md">
                        <NavbarBrand href="/">Time Value Calculator</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button onClick={() => this.props.clickLogout()}>Logout</Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            )
        } else {
            return (
                <div>
                    <Navbar className="nav" color="faded" light expand="md">
                        <NavbarBrand href="/">
                            <div id="title-page">
                                <h1>Time Value Calculator</h1>
                                <p>This app is designed to allow you to track the time you spend in the most common non work-related tasks, and then use your own valuation of the value of their non-work time to assess whether to outsource and pay for those tasks to be completed, or complete the tasks themselves.</p>
                            </div>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>

                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>

            )
        };
    }
}


export default NavBar;