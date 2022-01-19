import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

class TimeEdit extends React.Component {
    constructor(props) {
        super(props)
            this.state = {
                id: '',
                hourlyWage: '',
                neutralValue: ''
            };
        }

    componentWillMount() {
        this.setState({
            id: this.props.time.id,
            hourlyWage: this.props.time.hourlyWage,
            neutralValue: this.props.time.neutralValue
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
                    <ModalHeader >Log Time</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit} >
                            <FormGroup>
                                <Label for="hourlyWage">Hourly Wage</Label>
                                <Input id="hourlyWage" type="text" name="result" value={this.state.hourlyWage} placeholder="Enter hourly wage" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="neutralValue">Neutral Value</Label>
                                <Input id="neutralValue" type="text" name="neutralValue" value={this.state.neutralValue} placeholder="Enter your neutral hourly value" onChange={this.handleChange} />
                            </FormGroup>
                            <Button type="submit" color="primary"> Submit </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default TimeEdit;