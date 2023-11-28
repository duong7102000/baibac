import Stack from '@mui/system/Stack';
import PlayerCard from './PlayerCard';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import Box from '@mui/material/Box';
import React from 'react';
import AddPlayerModal from './AddPlayerModal';
import EditScoreModal from './EditScoreModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import HistoryModal from './HistoryModal';

function sortListPlayer(listPlayer) {
    return listPlayer.sort(function (b, a) {
        return a.score - b.score;
    });
}

export default function Body() {
    const [listPlayer, setListPlayer] = React.useState(
        JSON.parse(localStorage.getItem('listPlayer')) || []
    );
    const [openAddPlayerModal, setOpenAddPlayerModal] = React.useState(false);
    const [openEditScoreModal, setOpenEditScoreModal] = React.useState(false);
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
        React.useState(false);
    const [openHistoryModal, setOpenHistoryModal] = React.useState(false);
    const [history, setHistory] = React.useState(
        JSON.parse(localStorage.getItem('history')) || []
    );

    function addPlayer(player) {
        let newListPlayer = [...listPlayer, { name: player, score: 0 }];
        setListPlayer(sortListPlayer(newListPlayer));
        localStorage.setItem('listPlayer', JSON.stringify(newListPlayer));
    }

    const updateListPlayer = (updateListPlayer) => {
        updateListPlayer = updateListPlayer.map((x) => {return {...x, score: Number(x.score)}});
        let newHistory = [...history];
        newHistory.push(updateListPlayer);        
        setHistory(newHistory);
        localStorage.setItem('history', JSON.stringify(newHistory));
        let oldListPlayer = [...listPlayer];
        oldListPlayer.forEach((player) => {
            player.score += Number(
                updateListPlayer.find((x) => x.name === player.name).score
            );
        });
        let newListPlayer = sortListPlayer(oldListPlayer);
        setListPlayer(newListPlayer);
        localStorage.setItem('listPlayer', JSON.stringify(newListPlayer));
    }

    function reset() {
        setListPlayer([]);
        setHistory([]);
        localStorage.removeItem('listPlayer');
        localStorage.removeItem('history');
    }

    return (
        <>
            <Box sx={{ marginBottom: '30px', marginTop: '30px' }}>
                <Stack
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
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
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                justifyContent='center'
                alignItems='center'
            >
                <IconButton
                    aria-label='edit'
                    onClick={() => {
                        setOpenEditScoreModal(true);
                    }}
                    disabled={listPlayer.length < 2}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    aria-label='add'
                    onClick={() => {
                        setOpenAddPlayerModal(true);
                    }}
                >
                    <AddIcon />
                </IconButton>
                <IconButton
                    aria-label='delete'
                    onClick={() => {
                        setOpenConfirmDeleteModal(true);
                    }}
                    disabled={listPlayer.length < 1}
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    aria-label='history'
                    onClick={() => {
                        setOpenHistoryModal(true);
                    }}
                    // disabled={listPlayer.length < 1}
                >
                    <HistoryIcon />
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
            <HistoryModal
                status={openHistoryModal}
                callBack={() => setOpenHistoryModal(false)}
                history={history}
            />
        </>
    );
}
