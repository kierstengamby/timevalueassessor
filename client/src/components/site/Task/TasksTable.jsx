import React from 'react';
import { Table, Button } from 'reactstrap';

const TasksTable = (props) => {

    var totalCleaning = 0
    var totalLaundry = 0
    var totalMealPrep = 0
    var totalPetCare = 0
    var totalShopping = 0
    var totalCarCare = 0
    var totalTaxes = 0
    
    const array = props.tasks

    array.map((task, id) => {
        totalCleaning = totalCleaning + task.cleaning
        totalLaundry = totalLaundry + task.laundry
        totalMealPrep = totalMealPrep + task.mealPrep
        totalPetCare = totalPetCare + task.petCare
        totalShopping = totalShopping + task.shopping
        totalCarCare = totalCarCare + task.carCare
        totalTaxes = totalTaxes + task.taxes
    })
    
    // console.log(totalCleaning, totalLaundry, totalMealPrep, totalPetCare, totalShopping, totalCarCare, totalTaxes);

    return (
        <div>
            <h3>Tasks History</h3>
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
                    props.tasks.map((task, id) => {
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
                                    <Button id={task.id} onClick={props.delete} color="danger">Delete</Button>
                                    <Button id={task.id} onClick={e => props.update(e, task)} color="warning">Update</Button>
                                </td>
                            </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row">Totals</th>
                        <td>{totalCleaning}</td>
                        <td>{totalLaundry}</td>
                        <td>{totalMealPrep}</td>
                        <td>{totalPetCare}</td>
                        <td>{totalShopping}</td>
                        <td>{totalCarCare}</td>
                        <td>{totalTaxes}</td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    );
}

export default TasksTable;