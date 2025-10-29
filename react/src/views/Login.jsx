import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";


export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        setErrors(null);
        axiosClient.post('/login', payload).then(({data}) => {
            setUser(data.user);
            setToken(data.token);
        }).catch((errors) => {
            const response = errors.response;
            if (response && response.status === 422) {
                if(response.data.errors){
                    setErrors(response.data.errors);
                }else{
                    setErrors({
                        email:[response.data.message]
                    })
                }
            }
        });
    };


    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="title">Log in to your account</h1>
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                <form onSubmit={onSubmit}>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Log in</button>
                    <p className="message">
                        Not Registered?{" "}
                        <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
