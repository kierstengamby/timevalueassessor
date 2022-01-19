import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Container, Row } from 'reactstrap';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        fetch('http://localhost:9000/auth/register', {
            method: 'POST',
            body: JSON.stringify({ user: this.state }),
                    // {
                    //     firstName: firstName,
                    //     lastName: lastName,
                    //     email: email,
                    //     password: password
                    // }
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
                <h1>Register</h1>
                <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quia laudantium magnam facere saepe architecto incidunt. Voluptas, reiciendis, sed et tenetur delectus officia neque consequuntur quibusdam dignissimos incidunt, laudantium iure.</h6>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input id="r_firstName" type="text" name="firstName" placeholder="Enter first name" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">First Name</Label>
                        <Input id="r_lastName" type="text" name="lastName" placeholder="Enter last name" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                    <Label for="email">Email</Label>
                        <Input id="r_email" type="text" name="email" placeholder="Enter email" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="r_password" type="password" name="password" placeholder="Enter password" onChange={this.handleChange} />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Register;