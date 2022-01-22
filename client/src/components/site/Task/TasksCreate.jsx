import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class TasksCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // id: '',
            cleaning: 0,
            laundry: 0,
            mealPrep: 0,
            petCare: 0,
            shopping: 0, 
            carCare: 0,
            taxes: 0
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:9000/tasks/task`, {
            method: 'POST',
            body: JSON.stringify({ task: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
        .then((taskData) => {
            this.props.updateTasksArray(); 
            this.setState({
                id: '',
                cleaning: 0,
                laundry: 0,
                mealPrep: 0,
                petCare: 0,
                shopping: 0, 
                carCare: 0,
                taxes: 0
            });
            console.log(taskData);
        }); console.log(this.setState);
    }

    render() {
        return (
            <div>
                <h3>Log Tasks</h3>
                <hr />
                <Form onSubmit={this.handleSubmit} > 
                    <FormGroup>
                        <Label for="cleaning">Cleaning</Label>
                        <Input id="cleaning" type="text" name="cleaning" value={this.state.cleaning} placeholder="Average cleaning time" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="laundry">Laundry</Label>
                        <Input id="laundry" type="text" name="laundry" value={this.state.laundry} placeholder="Average laundry time" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="mealPrep">Meal Prep</Label>
                        <Input id="mealPrep" type="text" name="mealPrep" value={this.state.mealPrep} placeholder="Average meal prep time" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="petCare">Pet Care</Label>
                        <Input id="petCare" type="text" name="petCare" value={this.state.petCare} placeholder="Average pet care time" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="shopping">Shopping</Label>
                        <Input id="shopping" type="text" name="shopping" value={this.state.shopping} placeholder="Average shopping time" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="carCare">Car Care</Label>
                        <Input id="carCare" type="text" name="carCare" value={this.state.carCare} placeholder="Average car care time" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="taxes">Taxes</Label>
                        <Input id="taxes" type="text" name="taxes" value={this.state.taxes} placeholder="Average taxes time" onChange={this.handleChange} />
                    </FormGroup>
                    <Button type="submit" color="primary"> Submit </Button>
                </Form>
            </div>
        )
    }
}

export default TasksCreate;