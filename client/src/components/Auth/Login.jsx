import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Container, Row } from 'reactstrap';

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
        fetch('http://localhost:9000/auth/login', {
            method: 'POST',
            body: JSON.stringify({ user: this.state }),
                //     {
                //         email: email,
                //         password: password
                //     }
                // }),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }).then(
            (res) => res.json()
        ).then((data) => {
            this.props.setToken(data.sessionToken);
        }).catch(err => console.log(`${err}`));
        event.preventDefault();    
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi quia sit error blanditiis debitis eaque voluptatem et odit. Quae tempora fugiat quis est? Aliquam magni doloribus optio sed possimus tempora!</h6>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input id="li_email" type="text" name="email" placeholder="Enter email" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="li_password" type="password" name="password" placeholder="Enter password" onChange={this.handleChange} />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Login;