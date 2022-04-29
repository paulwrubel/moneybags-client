import { Box } from "@mui/material";

import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    // useLocation();
    return (
        <Box
        // position={"absolute"}
        // left={0}
        // right={0}
        // top={0}
        // bottom={0}
        // bgcolor={"white"}
        >
            <div>
                <h2>It looks like you&apos;re lost...</h2>
                <p>
                    The page you&apos;re looking for doesn&apos;t exist.
                    <br />
                    Go back <Link to="/">home</Link>
                </p>
            </div>
        </Box>
    );
};

export default NotFound;
