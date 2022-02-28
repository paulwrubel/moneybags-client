import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div>
            <h2>It looks like you&apos;re lost...</h2>
            <p>
                The page you&apos;re looking for doesn&apos;t exist.
                <br />
                Go back <Link to="/">home</Link>
            </p>
        </div>
    );
};

export default NotFound;
