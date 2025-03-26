import { useActionState, useContext } from "react";
import { Link, useNavigate } from "react-router";

import { useLogin } from "../../api/authApi";
import { useError } from "../../hooks/useError";
import { UserContext } from "../../contexts/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useLogin();
    const { error, setError } = useError();
    const { userLoginHandler } = useContext(UserContext);

    const loginHandler = async (prevState, formData) => {
        const { email, password } = Object.fromEntries(formData);

        if (!email || !password) {
            return setError('All fields must be filled!');
        }

        try {
            const authData = await login(email, password);

            delete authData.password;

            userLoginHandler(authData);

            navigate('/games');
        } catch (err) {
            console.error("Error logging in:", err.message);
            setError(err.message || "Failed to log in profile. Please try again.");
        }
    }

    const [state, loginAction, isPending] = useActionState(loginHandler, { email: '', password: '' });

    return (
        <section id="login-page" className="auth">
            <form id="login" action={loginAction}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Sokka@gmail.com"
                    />
                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" />
                    <input type="submit" className="btn submit" defaultValue="Login" disabled={isPending} />

                    {error && <p className="error">{error}</p>}

                    <p className="field">
                        <span>
                            If you don't have profile click <Link to="/register">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
}