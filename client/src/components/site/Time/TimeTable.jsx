import React from 'react';
import { Table, Button } from 'reactstrap';

const TimeTable = (props) => {
    return (
        <div>
            <h3>Time History</h3>
            <hr />
            <Table striped>
                <thead>
                    <tr>
                        {/* <th>#</th> */}
                        <th>Hourly Wage</th>
                        <th>Neutral Value</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                    props.timevalue.map((time, id) => {
                        return (
                            <tr key={id}>
                                {/* <th scope="row">{time.id}</th> */}
                                <td>{time.hourlyWage}</td>
                                <td>{time.neutralValue}</td>
                                <td>
                                    <Button id={time.id} onClick={props.delete} color="danger">Delete</Button>
                                    <Button id={time.id} onClick={e => props.update(e, time)} color="warning">Update</Button>
                                </td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default TimeTable;