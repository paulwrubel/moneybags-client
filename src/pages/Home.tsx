import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div>
            <p>This is the Home page.</p>
            <ul>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/create-account">Create Account</Link>
                </li>
                <li>
                    <Link to="/app">App</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
