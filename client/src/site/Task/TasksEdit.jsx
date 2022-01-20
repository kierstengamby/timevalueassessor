import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

class TasksEdit extends React.Component {
    constructor(props) {
        super(props)
            this.state = {
                id: '',
                cleaning: '',
                laundry: '',
                mealPrep: '',
                petCare: '',
                shopping: '', 
                carCare: '',
                taxes: ''
            };
        }

    componentWillMount() {
        this.setState({
            id: this.props.tasks.id,
            hourlyWage: this.props.tasks.hourlyWage,
            neutralValue: this.props.tasks.neutralValue
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.update(event, this.state)
    }

    render() {
        return (
            <div>
                <Modal isOpen={true} >
                    <ModalHeader >Log Tasks</ModalHeader>
                    <ModalBody>
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
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default TasksEdit;