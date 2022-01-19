import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Register from "./Register";
import Login from "./Login";
import "./Auth.css"

const Auth = (props) => {
    return (
        <Container className="auth-container">
            <Row>
                <Col md="6" className="register-col">
                    <Register setToken={props.setToken} />
                </Col>
                <Col md="6" className="login-col">
                    <Login setToken={props.setToken} />
                </Col>
            </Row>
        </Container>
    )
}


// class Auth extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             toggle: false,
//         }
//     }

//     render() {
//         return (
//             <div className="center">
//                 {
//                 <Container className='auth-container'>
//                     <Row mb-3>
//                         {toggle ? <Login updateToken={props.updateToken} /> : <Signup updateToken={props.updateToken} />}
//                         <Col>
//                             <Button outline color="dark" className="button" onClick={handleToggle}>{loginOrRegister}</Button>
//                         </Col>
//                     </Row>
    
//                 </Container>
//                 }
//             </div>
//         )
//     }
    
// }

// // const Auth = (props) => {
// //     const [loading, setLoading] = useState(false);

// //     useEffect(() => {
// //         setLoading(true)
// //         setTimeout(() => {
// //             setLoading(false)
// //         }, 1000)
// //     }, [])


// //     const [toggle, setToggle] = useState(true);
// //     const [loginOrRegister, setLoginOrRegister] = useState("Go to Sign Up");

// //     const handleToggle = () => {
// //         if (toggle === true) {
// //             setToggle(false);
// //             setLoginOrRegister("Go to Login");
// //         } else {
// //             setToggle(true);
// //             setLoginOrRegister("Go to Sign Up");
// //         }
// //     }

// // }

export default Auth;