import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const { setUser, setToken } = useStateContext();

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirm_password: confirmPasswordRef.current.value,
        };

        axiosClient.post("/signup", payload).then(({ data }) => {
            setUser(data.user);
            setToken(data.token);
        }).catch(err => {
            const response = err.response;
            if (response && response.status === 422){
                console.log(response.data.errors);
            }
        })
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="title">Sign up</h1>
                <form onSubmit={onSubmit}>
                    <input ref={nameRef} type="text" placeholder="Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        ref={confirmPasswordRef}
                        type="password"
                        placeholder="Confirm password"
                    />
                    <button className="btn btn-block">Sign up</button>
                    <p className="message">
                        Already registered?
                        <Link to="/login"> Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
