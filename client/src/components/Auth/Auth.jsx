import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Register from "./Register";
import Login from "./Login";
import "./authstyle.css"

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogged: true,
        }
    }

    componentDidMount() {
        this.rightSide.classList.add("right");
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

        this.setState((prevState) => ({ isLogged: !prevState.isLogged }))
    }

    render() {
        const { isLogged } = this.state;
        const current = isLogged ? "Register" : "Login";
        const currentActive = isLogged ? "login" : "register";
        return (
            <Container>
                <div className="Auth">
                    <div className="login">
                        <div className="container" ref={ref => (this.container = ref)}>
                            {isLogged && <Login setLoginToken={(token) => this.props.setLoginToken(token)} containerRef={(ref) => this.current = ref}  />}
                            {!isLogged && <Register setToken={(token) => this.props.setToken(token)} containerRef={(ref) => this.current = ref}  />}
                        </div>
                        <RightSide current={current} currentActive={currentActive} containerRef={ref => this.rightSide = ref} onClick={this.changeState.bind(this)} />
                    </div>
                </div>
            </Container>
        )
    }

}

const RightSide = (props) => {
    return (
        <div className="right-side" ref={props.containerRef} onClick={props.onClick}>
            <div className="inner-container">
                <div className="text">{props.current}</div>
            </div>
        </div>
    )
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