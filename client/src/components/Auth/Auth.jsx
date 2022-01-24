import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Register from "./Register";
import Login from "./Login";
import "./auth.css"


class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogged: true,
        }
    }

    changeState() {
        const { isLogged } = this.state;
        if (isLogged) {
            this.rightSide.classList.remove("right");
            this.rightSide.classList.add("left");
        } else {
            this.rightSide.classList.remove("left");
            this.rightSide.classList.add("right");
        }

        this.setState((prveState) => ({ isLogged: !prveState.isLogged }))
    }

    render() {
        const { isLogged } = this.state;
        const current = isLogged ? "Register" : "Login";
        const currentActive = isLogged ? "login" : "register";
        return (
            <div className="Auth">
                <div className="login">
                    <div className="container">
                        { isLogged && <Login containerRef={(ref) => this.current = ref} setLoginToken={(token) => this.props.setToken(token)} /> }
                        { !isLogged && <Register containerRef={(ref) => this.current = ref} setToken={(token) => this.props.setToken(token)} />}
                    </div>
                    <RightSide current={current} containerRef={ref => this.rightSide = ref} onClick={this.changeState.bind(this)} />
                </div>
            </div>
        )
    }

}

const RightSide = props => {
    return <div className="right-side" ref={props.containerRef} onClick={props.onClick}>
        <div className="inner-container">
            <div className="text">{props.current}</div>
        </div>
    </div>
}

// const Auth = (props) => {

//     return (
//         <Container className="auth-container">
//             <Row>
//                 <Col md="6" className="register-col">
//                     <Register setToken={(token) => props.setToken(token)} />
//                 </Col>
//                 <Col md="6" className="login-col">
//                     <Login setLoginToken={(token) => props.setToken(token)} />
//                 </Col>
//             </Row>
//         </Container>
//     )
// }


export default Auth;