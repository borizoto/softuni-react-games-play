import { Link, useNavigate } from "react-router";
import { useError } from "../../hooks/useError";
import { useActionState, useContext } from "react";
import { useRegister } from "../../api/authApi";
import { UserContext } from "../../contexts/UserContext";

export default function Register() {
    const { setError, error } = useError();
    const { register } = useRegister();
    const { userLoginHandler } = useContext(UserContext);
    const navigate = useNavigate();

    const registerHandler = async (prevState, formData) => {
        const { email, password } = Object.fromEntries(formData);
        const rePassword = formData.get('confirm-password');

        if (!email || !password) {
            return setError('All fields must be filled!');
        }

        if (password !== rePassword) {
            return setError('Passwords don\'t match');
        }

        try {
            const authData = await register(email, password);

            delete authData.password;

            userLoginHandler(authData);

            navigate('/games');
        } catch (err) {
            console.error("Error registering:", err.message);
            setError(err.message || "Failed to register user. Please try again.");
        }
    };

    const [state, registerAction, isPending] = useActionState(registerHandler);

    return (
        <section id="register-page" className="content auth">
            <form id="register" action={registerAction}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Register</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                    />
                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password" />
                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password" />
                    <input className="btn submit" type="submit" defaultValue="Register" disabled={isPending} />

                    {error && <p className="error">{error}</p>}

                    <p className="field">
                        <span>
                            If you already have profile click <Link to="/login">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
}