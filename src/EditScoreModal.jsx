import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Stack from "@mui/system/Stack";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

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

function convertListPlayer(listPlayer) {
    let result = [];
    listPlayer.forEach((element) => {
        let player = { name: "", score: null };
        player.name = element.name;
        result = [...result, player];
    });
    return result;
}

export default function EditScoreModal(props) {
    const [listPlayer, setListPlayer] = React.useState(
        convertListPlayer(props.listPlayer)
    );
    React.useEffect(() => {
        setListPlayer(convertListPlayer(props.listPlayer));
    }, [props.listPlayer]);

    const resetScore = () => {
        listPlayer.forEach((element) => {
            element.score = null;
        });
        setListPlayer(listPlayer);
    };

    const handleClose = () => {
        props.callBack(false);
        resetScore();
    };

    return (
        <div>
            <Modal open={props.status} onClose={handleClose}>
                <Box sx={style}>
                    <div>
                        {listPlayer.map((player, index) => {
                            return (
                                <div key={index}>
                                    <TextField
                                        id="outlined-number"
                                        type="number"
                                        label={player.name}
                                        sx={{
                                            width: "400px",
                                            marginBottom: "10px",
                                        }}
                                        value={player.score}
                                        onChange={(e) => {
                                            let newPlayer = {
                                                name: player.name,
                                                score: Number(e.target.value),
                                            };
                                            var newListPlayer = [...listPlayer];
                                            newListPlayer[index] = newPlayer;
                                            setListPlayer(newListPlayer);
                                        }}
                                    />
                                </div>
                            );
                        })}

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
                                }}
                                // disabled={
                                //     playerInput.length === 0 ? true : false
                                // }
                            >
                                <CheckOutlinedIcon />
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
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
