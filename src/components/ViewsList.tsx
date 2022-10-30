import { Box, Button } from "@mui/material";

import { Link, useMatch } from "react-router-dom";

import SolidSelectable from "components/SolidSelectable";

const ViewsList: React.FC = () => {
    const match = useMatch("/:budgetID/:viewName");

    const color = "primary.light";
    const selectedColor = "primary.dark";
    const hoverColor = "primary.main";

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                }}
            >
                <SolidSelectable
                    isSelected={match?.params.viewName === "allocations"}
                    color={color}
                    selectedColor={selectedColor}
                    hoverColor={hoverColor}
                >
                    {/* <Paper square elevation={0} sx={{ width: 1 }}> */}
                    <Button
                        to="../allocations"
                        component={Link}
                        sx={{ width: 1, color: "black" }}
                    >
                        Allocations
                    </Button>
                    {/* </Paper> */}
                </SolidSelectable>
                <SolidSelectable
                    isSelected={match?.params.viewName === "insights"}
                    color={color}
                    selectedColor={selectedColor}
                    hoverColor={hoverColor}
                >
                    <Button
                        to="../insights"
                        component={Link}
                        sx={{ width: 1, color: "black" }}
                    >
                        Insights
                    </Button>
                </SolidSelectable>
                <SolidSelectable
                    isSelected={match?.params.viewName === "accounts"}
                    color={color}
                    selectedColor={selectedColor}
                    hoverColor={hoverColor}
                >
                    <Button
                        to="../accounts"
                        component={Link}
                        sx={{ width: 1, color: "black" }}
                    >
                        Accounts
                    </Button>
                </SolidSelectable>
            </Box>
        </>
    );
};

export default ViewsList;
