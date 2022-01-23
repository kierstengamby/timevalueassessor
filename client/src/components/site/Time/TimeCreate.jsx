import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class TimeCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            hourlyWage: 0,
            neutralValue: 0
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     fetch(`http://localhost:9000/timevalue/time`, {
    //         method: 'POST',
    //         body: JSON.stringify({ time: this.state }),
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': this.props.token
    //         })
    //     }).then((res) => res.json())
    //     .then((timeData) => {
    //         this.props.updateTimeArray(); 
    //         this.setState({
    //             id: '',
    //             hourlyWage: 0,
    //             neutralValue: 0
    //         })
    //     }); console.log(this.setState);
    // }

    render() {
        return (
            <div>
                <h3>Log Time</h3>
                <hr />
                <Form onSubmit={this.handleSubmit} > 
                {/* Does type need to be a number for the below inputs? */}
                    <FormGroup>
                        <Label for="hourlyWage">Hourly Wage</Label>
                        <Input id="hourlyWage" type="text" name="hourlyWage" value={this.state.hourlyWage} placeholder="Enter hourly wage" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="neutralValue">Neutral Value</Label>
                        <Input id="neutralValue" type="text" name="neutralValue" value={this.state.neutralValue} placeholder="Enter your neutral hourly value" onChange={this.handleChange} />
                    </FormGroup>
                    <Button type="submit" color="primary"> Submit </Button>
                </Form>
            </div>
        )
    }
}

export default TimeCreate;