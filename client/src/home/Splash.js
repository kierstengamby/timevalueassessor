import React, { useState } from 'react';
import ValueCalcIndex from '../components/site/Values/ValueCalcIndex';
import TimeIndex from '../components/site/Time/TimeIndex';
import TasksIndex from '../components/site/Task/TasksIndex';
import Stopwatch from '../components/site/Stopwatch/Stopwatch';
import Homepage from '../components/site/Homepage/Homepage';
import { Carousel, CarouselItem } from 'reactstrap';

function Splash(props) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} arrows >
            <CarouselItem>
                <Homepage token={props.sessionToken} />
            </CarouselItem>
            <CarouselItem>
                <ValueCalcIndex token={props.sessionToken} tasks={props.tasks} time={props.time} />
            </CarouselItem>
            <CarouselItem>
                <TimeIndex token={props.sessionToken} time={props.time} />
            </CarouselItem>
            <CarouselItem>
                <TasksIndex token={props.sessionToken} tasks={props.tasks} />
            </CarouselItem>
            <CarouselItem>
                <Stopwatch token={props.sessionToken} />
            </CarouselItem>
        </Carousel>
    );
    };


// const Splash = (props) => {
//     return (
//         <Carousel>
//             <CarouselItem>
//                 <Homepage token={props.sessionToken} />
//                 <br /><br />
//             </CarouselItem>
//             <CarouselItem><ValueCalcIndex token={props.sessionToken} tasks={props.tasks} time={props.time} />
//                 <br /><br /><br />
//             </CarouselItem>
//             <CarouselItem><TimeIndex token={props.sessionToken} time={props.time} />
//                 <br /><br />
//             </CarouselItem>
//             <CarouselItem>
//                 <TasksIndex token={props.sessionToken} tasks={props.tasks} />
//                 <br />
//             </CarouselItem><CarouselItem><Stopwatch token={props.sessionToken} />
//             </CarouselItem>
//         </Carousel>
//     )
// }

export default Splash;