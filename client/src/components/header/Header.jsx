import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { useAuthRequest } from "../../hooks/useAuthRequest";

export default function Header() {
    const { email } = useContext(UserContext);
    const { isAuthenticated } = useAuthRequest();

    return (
        <header>
            <h1>
                <Link className="home" to="/">
                    GamesPlay
                </Link>
            </h1>
            <nav>
                {email}
                <Link to="/games">All games</Link>

                {isAuthenticated
                    ? (<div id="user">
                        <Link to="/games/create">Create Game</Link>
                        <Link to="/logout">Logout</Link>
                    </div>)
                    : (
                        <div id="guest">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    )
                }
            </nav>
        </header>
    );
}