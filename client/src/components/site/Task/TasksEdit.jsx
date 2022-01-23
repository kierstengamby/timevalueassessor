import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

class TasksEdit extends React.Component {
    constructor(props) {
        super(props)
            this.state = {
                id: '',
                cleaning: 0,
                laundry: 0,
                mealPrep: 0,
                petCare: 0,
                shopping: 0, 
                carCare: 0,
                taxes: 0,
                updateFlag: this.props.updateFlag,
            };
        }

    componentDidMount() {
        this.setState({
            id: this.props.tasks.id,
            cleaning: this.props.tasks.cleaning,
            laundry: this.props.tasks.laundry,
            mealPrep: this.props.tasks.mealPrep,
            petCare: this.props.tasks.petCare,
            shopping: this.props.tasks.shopping,
            carCare: this.props.tasks.carCare,
            taxes: this.props.tasks.taxes
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
                        <Input id="cleaning" type="text" name="cleaning" value={this.state.cleaning} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="laundry">Laundry</Label>
                        <Input id="laundry" type="text" name="laundry" value={this.state.laundry} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="mealPrep">Meal Prep</Label>
                        <Input id="mealPrep" type="text" name="mealPrep" value={this.state.mealPrep} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="petCare">Pet Care</Label>
                        <Input id="petCare" type="text" name="petCare" value={this.state.petCare} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="shopping">Shopping</Label>
                        <Input id="shopping" type="text" name="shopping" value={this.state.shopping} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="carCare">Car Care</Label>
                        <Input id="carCare" type="text" name="carCare" value={this.state.carCare} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="taxes">Taxes</Label>
                        <Input id="taxes" type="text" name="taxes" value={this.state.taxes} onChange={this.handleChange} />
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