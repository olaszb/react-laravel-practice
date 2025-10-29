export default function Signup() {

    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="title">Sign up</h1>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm password" />
                    <button className="btn btn-block">Sign up</button>
                    <p className="message">
                        Already registered?
                        <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
