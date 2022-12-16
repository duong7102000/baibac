import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Stack from "@mui/system/Stack";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function AddPlayerModal(props) {
    const [playerInput, setPlayerInput] = React.useState("");

    const handleClose = () => {
        props.callBack(false);
    };

    const addPlayer = (player) => {
        props.addPlayer(player);
    };

    return (
        <div>
            <Modal open={props.status} onClose={handleClose}>
                <Box sx={style}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Con nghiện mới"
                        sx={{ width: "400px", marginBottom: "10px" }}
                        value={playerInput}
                        onChange={(e) => setPlayerInput(e.target.value)}
                    />
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <IconButton
                            aria-label="add"
                            color="success"
                            onClick={() => {
                                handleClose();
                                setPlayerInput("");
                                addPlayer(playerInput);
                            }}
                            disabled={playerInput.length === 0 ? true : false}
                        >
                            <AddCircleOutlineOutlinedIcon />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => {
                                handleClose();
                                setPlayerInput("");
                            }}
                        >
                            <CancelOutlinedIcon />
                        </IconButton>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
