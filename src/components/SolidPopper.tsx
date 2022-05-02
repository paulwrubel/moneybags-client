import { Box, ClickAwayListener, Popper } from "@mui/material";
import { PopperPlacementType } from "@mui/material/Popper";

const SolidPopper: React.FC<{
    isOpen: boolean;
    anchorEl: Element | null;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<Element | null>>;
    placement?: PopperPlacementType;
    children: React.ReactNode;
}> = ({ isOpen, anchorEl, setIsOpen, setAnchorEl, placement, children }) => {
    return (
        <Popper
            open={isOpen}
            anchorEl={anchorEl}
            disablePortal
            placement={placement}
            sx={{ zIndex: 1 }}
            // modifiers={[
            //     {
            //         name: "arrow",
            //         enabled: true,
            //         options: {
            //             element: arrowRef,
            //         },
            //     },
            // ]}
        >
            {/* <Box
                        ref={setArrowRef}
                        className="MuiPopper-arrow"
                        sx={{
                            position: "absolute",
                            fontSize: 7,
                            width: "3em",
                            height: "3em",
                            "&::before": {
                                content: '""',
                                margin: "auto",
                                display: "block",
                                width: 0,
                                height: 0,
                                borderStyle: "solid",
                                //---
                                borderWidth: "0 2em 2em 2em",
                                borderColor: (theme: Theme) =>
                                    `transparent transparent ${theme.palette.background.paper} transparent`,
                            },
                            top: 0,
                            left: 0,
                            marginTop: "0.1em",
                            // width: "3em",
                            // height: "1em",
                        }}
                    /> */}
            {/* <Box sx={{ marginTop: 2 }}> */}
            <ClickAwayListener
                onClickAway={() => {
                    setIsOpen(false);
                    setAnchorEl(null);
                }}
            >
                <Box>{children}</Box>
            </ClickAwayListener>
            {/* </Box> */}
        </Popper>
    );
};

export default SolidPopper;
