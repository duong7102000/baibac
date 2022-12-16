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

function sortListPlayer(listPlayer) {
    return listPlayer.sort(function (a, b) {
        return a.score - b.score;
    });
}

export default function Body() {
    const [listPlayer, setListPlayer] = React.useState([
        { name: "Tung Duong", score: 0 },
        { name: "Duc", score: 5 },
    ]);
    const [openAddPlayerModal, setOpenAddPlayerModal] = React.useState(false);
    const [openEditScoreModal, setOpenEditScoreModal] = React.useState(false);

    function addPlayer(player) {
        setListPlayer(
            sortListPlayer([...listPlayer, { name: player, score: 0 }])
        );
    }

    function reset() {
        setListPlayer([]);
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
                        return <PlayerCard name={ele.name} score={ele.score} />;
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
                <IconButton aria-label="delete">
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
            />
        </>
    );
}
