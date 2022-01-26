import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Container, Row } from 'reactstrap';
import APIURL from '../../helpers/environment';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        fetch(`${APIURL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ user: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (res) => res.json()
        ).then((data) => {
            if (data.sessionToken !== undefined) {
                this.props.setLoginToken(data.sessionToken)
            } else {
                alert(`${data.message}`)
            }
        }).catch(err => console.log(`${err}`));
        event.preventDefault();
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <h1>Login</h1>
                <br />
                <h6>If you already have an account, please log in using your email and password below.</h6>
                <hr />
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input id="li_email" type="text" name="email" placeholder="Enter email" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="li_password" type="password" name="password" placeholder="Enter password" onChange={this.handleChange} />
                    </FormGroup>
                    <Button className="btn" type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Login;