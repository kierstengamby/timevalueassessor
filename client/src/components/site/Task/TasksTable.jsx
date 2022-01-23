import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';


class TasksTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: this.props.tasks,
            totalCleaning: 0,
            totalLaundry: 0,
            totalMealPrep: 0,
            totalPetCare: 0,
            totalShopping: 0,
            totalCarCare: 0,
            totalTaxes: 0,
        }

        const array = props.tasks

        array.map((task, id) => {
            this.totalCleaning = this.totalCleaning + task.cleaning
            this.totalLaundry = this.totalLaundry + task.laundry
            this.totalMealPrep = this.totalMealPrep + task.mealPrep
            this.totalPetCare = this.totalPetCare + task.petCare
            this.totalShopping = this.totalShopping + task.shopping
            this.totalCarCare = this.totalCarCare + task.carCare
            this.totalTaxes = this.totalTaxes + task.taxes
        })
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:9000/tasks/', {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        });
        const json = await response.json();
        this.setState({ tasks: json })
        const array = json

        // console.log(json[0].cleaning)
        array.map((task, id) => {
            this.state.totalCleaning += task.cleaning
            this.state.totalLaundry += task.laundry
            this.state.totalMealPrep +=  task.mealPrep
            this.state.totalPetCare +=  task.petCare
            this.state.totalShopping +=  task.shopping
            this.state.totalCarCare +=  task.carCare
            this.state.totalTaxes +=  task.taxes
        })
    }

    render() {
        return (
            <div>
                <h3>Tasks History Chase:{`${this.state.updateFlag}`}</h3>
                <hr />
                <Table striped>
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
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
                                        {/* <th scope="row">{task.id}</th> */}
                                        <th></th>
                                        <td>{task.cleaning}</td>
                                        <td>{task.laundry}</td>
                                        <td>{task.mealPrep}</td>
                                        <td>{task.petCare}</td>
                                        <td>{task.shopping}</td>
                                        <td>{task.carCare}</td>
                                        <td>{task.taxes}</td>
                                        <td>
                                            <Button id={task.id} onClick={this.props.delete} color="danger">Delete</Button>
                                            <Button id={task.id} onClick={e => this.props.update(e, task)} color="warning">Update</Button>
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
                        </tr>
                    </tfoot>
                </Table>
            </div>
        );
    }
}

export default TasksTable;