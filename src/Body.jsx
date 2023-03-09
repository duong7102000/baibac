import Stack from "@mui/system/Stack";
import PlayerCard from "./PlayerCard";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import React from "react";
import AddPlayerModal from "./AddPlayerModal";
import EditScoreModal from "./EditScoreModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

function sortListPlayer(listPlayer) {
    return listPlayer.sort(function (b, a) {
        return a.score - b.score;
    });
}

export default function Body() {
    const [listPlayer, setListPlayer] = React.useState(
        JSON.parse(localStorage.getItem("listPlayer")) || []
    );
    const [openAddPlayerModal, setOpenAddPlayerModal] = React.useState(false);
    const [openEditScoreModal, setOpenEditScoreModal] = React.useState(false);
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
        React.useState(false);

    function addPlayer(player) {
        let newListPlayer = [...listPlayer, { name: player, score: 0 }];
        setListPlayer(sortListPlayer(newListPlayer));
        localStorage.setItem("listPlayer", JSON.stringify(newListPlayer));
    }

    function updateListPlayer(updateListPlayer) {
        let oldListPlayer = [...listPlayer];
        oldListPlayer.forEach((player, index) => {
            player.score += Number(updateListPlayer[index].score);
        });
        let newListPlayer = sortListPlayer(oldListPlayer);
        setListPlayer(newListPlayer);
        localStorage.setItem("listPlayer", JSON.stringify(newListPlayer));
    }

    function reset() {
        setListPlayer([]);
        localStorage.removeItem("listPlayer");
    }

    return (
        <>
            <Box sx={{ marginBottom: "30px", marginTop: "30px" }}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    {listPlayer.map((ele) => {
                        return (
                            <PlayerCard
                                name={ele.name}
                                score={ele.score}
                                key={Math.random()}
                            />
                        );
                    })}
                </Stack>
            </Box>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                justifyContent="center"
                alignItems="center"
            >
                <IconButton
                    aria-label="edit"
                    onClick={() => {
                        setOpenEditScoreModal(true);
                    }}
                    disabled = {
                        listPlayer.length < 2
                    }
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    aria-label="add"
                    onClick={() => {
                        setOpenAddPlayerModal(true);
                    }}
                >
                    <AddIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    onClick={() => {
                        setOpenConfirmDeleteModal(true);
                    }}
                    disabled = {listPlayer.length < 1}
                >
                    <DeleteIcon />
                </IconButton>
            </Stack>
            <AddPlayerModal
                status={openAddPlayerModal}
                callBack={() => setOpenAddPlayerModal(false)}
                addPlayer={addPlayer}
            />
            <EditScoreModal
                status={openEditScoreModal}
                callBack={() => setOpenEditScoreModal(false)}
                listPlayer={listPlayer}
                onClickSubmit={updateListPlayer}
            />
            <ConfirmDeleteModal
                status={openConfirmDeleteModal}
                callBack={() => setOpenConfirmDeleteModal(false)}
                handleSubmit={reset}
            />
        </>
    );
}
