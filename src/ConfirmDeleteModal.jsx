import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack"

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
    display: "flex",
    alignItem: "center",
    flexDirection: "column",
};

export default function ConfirmDeleteModal(props) {
    const handleClose = () => {
        props.callBack(false);
    };

    const handleSubmit = () => {
        props.handleSubmit();
    };

    return (
        <div>
            <Modal open={props.status} onClose={handleClose}>
                <Box sx={style}>
                    <Typography align="center">Có muốn xoá không?</Typography>
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
                                handleSubmit();
                            }}
                        >
                            <CheckCircleOutlineRoundedIcon />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => {
                                handleClose();
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
