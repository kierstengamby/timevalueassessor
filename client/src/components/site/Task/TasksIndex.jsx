import React, { Component } from 'react';
import { Container, Row, Col, Table, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import APIURL from '../../../helpers/environment';

class TasksIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: this.props.tasks,
            updatePressed: false,
            tasksToUpdate: this.props.tasks,
            totalCleaning: 0,
            totalLaundry: 0,
            totalMealPrep: 0,
            totalPetCare: 0,
            totalShopping: 0,
            totalCarCare: 0,
            totalTaxes: 0,
            cleaning: 0,
            laundry: 0,
            mealPrep: 0,
            petCare: 0,
            shopping: 0,
            carCare: 0,
            taxes: 0,
            newCleaning: 0,
            newLaundry: 0,
            newMealPrep: 0,
            newPetCare: 0,
            newShopping: 0,
            newCarCare: 0,
            newTaxes: 0,
            updateCleaning: 0,
            updateLaundry: 0,
            updateMealPrep: 0,
            updatePetCare: 0,
            updateShopping: 0,
            updateCarCare: 0,
            updateTaxes: 0
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async componentDidMount() {
        const response = await fetch(`${APIURL}/tasks/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        });
        const json = await response.json();
        this.setState({ tasks: json })
        const array = json

        array.map((task, id) => {
            this.setState({ totalCleaning: this.state.totalCleaning += task.cleaning })
            this.state.totalLaundry += task.laundry
            this.state.totalMealPrep += task.mealPrep
            this.state.totalPetCare += task.petCare
            this.state.totalShopping += task.shopping
            this.state.totalCarCare += task.carCare
            this.state.totalTaxes += task.taxes
        })
        console.log('component mounting');
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/tasks/task`, {
            method: 'POST',
            body: JSON.stringify({ task: { cleaning: this.state.newCleaning, laundry: this.state.newLaundry, mealPrep: this.state.newMealPrep, petCare: this.state.newPetCare, shopping: this.state.newShopping, carCare: this.state.newCarCare, taxes: this.state.newTaxes } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
            .then((taskData) => {
                let tempTasks = this.state.tasks
                tempTasks.push({ id: taskData.task.id, cleaning: this.state.newCleaning, laundry: this.state.newLaundry, mealPrep: this.state.newMealPrep, petCare: this.state.newPetCare, shopping: this.state.newShopping, carCare: this.state.newCarCare, taxes: this.state.newTaxes })
                this.setState({ tasks: tempTasks })
                this.setState({ totalCleaning: this.state.totalCleaning + parseInt(this.state.newCleaning) })
                this.setState({ totalLaundry: this.state.totalLaundry + parseInt(this.state.newLaundry) })
                this.setState({ totalMealPrep: this.state.totalMealPrep + parseInt(this.state.newMealPrep) })
                this.setState({ totalPetCare: this.state.totalPetCare + parseInt(this.state.newPetCare) })
                this.setState({ totalShopping: this.state.totalShopping + parseInt(this.state.newShopping) })
                this.setState({ totalCarCare: this.state.totalCarCare + parseInt(this.state.newCarCare) })
                this.setState({ totalTaxes: this.state.totalTaxes + parseInt(this.state.newTaxes) })
                this.setState({
                    newCleaning: 0,
                    newLaundry: 0,
                    newMealPrep: 0,
                    newPetCare: 0,
                    newShopping: 0,
                    newCarCare: 0,
                    newTaxes: 0
                });
            });
    }

    tasksDelete = (event) => {
        fetch(`${APIURL}/tasks/${event.target.id}`, {
            method: 'DELETE',
            body: JSON.stringify({ task: { id: event.target.id } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => {
            let tempTasks = this.state.tasks.filter(function (tasks) {
                return tasks.id !== event.target.id
            })
            let taskToRemove = this.state.tasks.find(function (tasks) {
                return tasks.id === event.target.id
            })
            this.setState({ tasks: tempTasks })
            this.setState({ totalCleaning: this.state.totalCleaning - parseInt(taskToRemove.cleaning) })
            this.setState({ totalLaundry: this.state.totalLaundry - parseInt(taskToRemove.laundry) })
            this.setState({ totalMealPrep: this.state.totalMealPrep - parseInt(taskToRemove.mealPrep) })
            this.setState({ totalPetCare: this.state.totalPetCare - parseInt(taskToRemove.petCare) })
            this.setState({ totalShopping: this.state.totalShopping - parseInt(taskToRemove.shopping) })
            this.setState({ totalCarCare: this.state.totalCarCare - parseInt(taskToRemove.carCare) })
            this.setState({ totalTaxes: this.state.totalTaxes - parseInt(taskToRemove.taxes) })
        })
    }

    tasksUpdate = (event, taskId) => {
        fetch(`${APIURL}/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify({ task: { cleaning: this.state.updateCleaning, laundry: this.state.updateLaundry, mealPrep: this.state.updateMealPrep, petCare: this.state.updatePetCare, shopping: this.state.updateShopping, carCare: this.state.updateCarCare, taxes: this.state.updateTaxes } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => {
            const self = this
            self.setState({ updatePressed: false })
            // removing the task that was updated
            let tempTasks = this.state.tasks.filter(function (tasks) {
                return tasks.id !== self.state.tasksToUpdate.id
            })
            // putting the updated task back
            tempTasks.push({ id: taskId, cleaning: this.state.updateCleaning, laundry: this.state.updateLaundry, mealPrep: this.state.updateMealPrep, petCare: this.state.updatePetCare, shopping: this.state.updateShopping, carCare: this.state.updateCarCare, taxes: this.state.updateTaxes })
            // setting the tasks that now include the updated task
            this.setState({ tasks: tempTasks })
            // remove the last task values and then add the new values
            this.setState({ totalCleaning: this.state.totalCleaning - parseInt(this.state.tasksToUpdate.cleaning) + parseInt(this.state.updateCleaning) })
            this.setState({ totalLaundry: this.state.totalLaundry - parseInt(this.state.tasksToUpdate.laundry) + parseInt(this.state.updateLaundry) })
            this.setState({ totalMealPrep: this.state.totalMealPrep - parseInt(this.state.tasksToUpdate.mealPrep) + parseInt(this.state.updateMealPrep) })
            this.setState({ totalPetCare: this.state.totalPetCare - parseInt(this.state.tasksToUpdate.petCare) + parseInt(this.state.updatePetCare) })
            this.setState({ totalShopping: this.state.totalShopping - parseInt(this.state.tasksToUpdate.shopping) + parseInt(this.state.updateShopping) })
            this.setState({ totalCarCare: this.state.totalCarCare - parseInt(this.state.tasksToUpdate.carCare) + parseInt(this.state.updateCarCare) })
            this.setState({ totalTaxes: this.state.totalTaxes - parseInt(this.state.tasksToUpdate.taxes) + parseInt(this.state.updateTaxes) })
        })
    }

    setUpdatedTask = (event, task) => {
        this.setState({
            tasksToUpdate: task,
            updatePressed: true,
            updateCleaning: task.cleaning,
            updateLaundry: task.laundry,
            updateMealPrep: task.mealPrep,
            updatePetCare: task.petCare,
            updateShopping: task.shopping,
            updateCarCare: task.carCare,
            updateTaxes: task.taxes,
        })
    }

    handleUpdateChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUpdateSubmit = (event) => {
        event.preventDefault();
        this.tasksUpdate(event, this.state.tasksToUpdate.id)
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md="3">
                        <div>
                        <hr />
                            <h3>Log Tasks</h3>
                            <h6>Log each time in minutes (e.g. enter 90 for 1.5 hours)</h6>
                            <h6>Round each number to the nearest whole number</h6>
                            <hr />
                            <Form onSubmit={this.handleSubmit} >
                                <FormGroup>
                                    <Label for="cleaning">Cleaning</Label>
                                    <Input id="cleaning" type="text" name="newCleaning" value={this.state.newCleaning} placeholder="Average cleaning time" onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="laundry">Laundry</Label>
                                    <Input id="laundry" type="text" name="newLaundry" value={this.state.newLaundry} placeholder="Average laundry time" onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="mealPrep">Meal Prep</Label>
                                    <Input id="mealPrep" type="text" name="newMealPrep" value={this.state.newMealPrep} placeholder="Average meal prep time" onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="petCare">Pet Care</Label>
                                    <Input id="petCare" type="text" name="newPetCare" value={this.state.newPetCare} placeholder="Average pet care time" onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="shopping">Shopping</Label>
                                    <Input id="shopping" type="text" name="newShopping" value={this.state.newShopping} placeholder="Average shopping time" onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="carCare">Car Care</Label>
                                    <Input id="carCare" type="text" name="newCarCare" value={this.state.newCarCare} placeholder="Average car care time" onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="taxes">Taxes</Label>
                                    <Input id="taxes" type="text" name="newTaxes" value={this.state.newTaxes} placeholder="Average taxes time" onChange={this.handleChange} />
                                </FormGroup>
                                <Button type="submit" color="secondary"> Submit </Button>
                            </Form>
                        </div>
                    </Col>
                    <Col md="9">
                        <div>
                        <hr />
                            <h3>Tasks History</h3>
                            <hr />
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Cleaning</th>
                                        <th>Laundry</th>
                                        <th>Meal Prep</th>
                                        <th>Pet Care</th>
                                        <th>Shopping</th>
                                        <th>Car Care</th>
                                        <th>Taxes</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map((task, id) => {
                                            return (
                                                <tr key={id}>
                                                    <th></th>
                                                    <td>{task.cleaning}</td>
                                                    <td>{task.laundry}</td>
                                                    <td>{task.mealPrep}</td>
                                                    <td>{task.petCare}</td>
                                                    <td>{task.shopping}</td>
                                                    <td>{task.carCare}</td>
                                                    <td>{task.taxes}</td>
                                                    <td>
                                                        <Button id={task.id} onClick={e => this.setUpdatedTask(e, task)} color="outline-light">Update</Button>
                                                        <Button id={task.id} onClick={this.tasksDelete} color="outline-secondary">Delete</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th scope="row">Totals</th>
                                        <td>{this.state.totalCleaning}</td>
                                        <td>{this.state.totalLaundry}</td>
                                        <td>{this.state.totalMealPrep}</td>
                                        <td>{this.state.totalPetCare}</td>
                                        <td>{this.state.totalShopping}</td>
                                        <td>{this.state.totalCarCare}</td>
                                        <td>{this.state.totalTaxes}</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </div>
                    </Col>
                    <Col md="12">
                        <div>
                            <Modal isOpen={this.state.updatePressed} size="lg" centered>
                                <ModalHeader >Log Tasks</ModalHeader>
                                <ModalBody>
                                    <h6>Log each time in minutes (e.g. enter 90 for 1.5 hours)</h6>
                                    <h6>Round each number to the nearest whole number</h6>
                                    <Form onSubmit={this.handleUpdateSubmit} >
                                        <FormGroup>
                                            <Label for="cleaning">Cleaning</Label>
                                            <Input id="cleaning" type="text" name="updateCleaning" value={this.state.updateCleaning} onChange={this.handleUpdateChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="laundry">Laundry</Label>
                                            <Input id="laundry" type="text" name="updateLaundry" value={this.state.updateLaundry} onChange={this.handleUpdateChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="mealPrep">Meal Prep</Label>
                                            <Input id="mealPrep" type="text" name="updateMealPrep" value={this.state.updateMealPrep} onChange={this.handleUpdateChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="petCare">Pet Care</Label>
                                            <Input id="petCare" type="text" name="updatePetCare" value={this.state.updatePetCare} onChange={this.handleUpdateChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="shopping">Shopping</Label>
                                            <Input id="shopping" type="text" name="updateShopping" value={this.state.updateShopping} onChange={this.handleUpdateChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="carCare">Car Care</Label>
                                            <Input id="carCare" type="text" name="updateCarCare" value={this.state.updateCarCare} onChange={this.handleUpdateChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="taxes">Taxes</Label>
                                            <Input id="taxes" type="text" name="updateTaxes" value={this.state.updateTaxes} onChange={this.handleUpdateChange} />
                                        </FormGroup>
                                        <Button type="submit" color="secondary"> Submit </Button>
                                    </Form>
                                </ModalBody>
                            </Modal>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default TasksIndex;