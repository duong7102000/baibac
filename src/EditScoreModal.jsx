import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Stack from '@mui/system/Stack';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    maxHeight: '100%',
};

function convertListPlayer(listPlayer) {
    let result = [];
    listPlayer.forEach((element) => {
        let player = { name: '', score: '' };
        player.name = element.name;
        result = [...result, player];
    });    
    result = result.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });    
    return result;
}

function checkSum(listPlayer) {
    let sumScore = 0;
    listPlayer.forEach((player) => {
        sumScore = sumScore + Number(player.score);
    });
    return sumScore === 0;
}

function initValidationArray(listPlayer) {
    return Array(listPlayer.length).fill('');
}

export default function EditScoreModal(props) {
    const [listPlayer, setListPlayer] = React.useState(
        convertListPlayer(props.listPlayer)
    );
    const [canSubmit, setCanSubmit] = React.useState(false);
    const [errorInput, setErrorInput] = React.useState(
        initValidationArray(props.listPlayer)
    );
    React.useEffect(() => {
        setListPlayer(convertListPlayer(props.listPlayer));
        setErrorInput(initValidationArray(props.listPlayer));
    }, [props.listPlayer]);

    const resetScore = () => {
        let resetListPlayer = [...listPlayer];
        resetListPlayer.forEach((element) => {
            element.score = '';
        });
        setListPlayer(resetListPlayer);
    };

    const handleClose = () => {
        props.callBack(false);
        setErrorInput(Array(listPlayer.length).fill(''));
        setCanSubmit(false);
        resetScore();
    };

    const validateNumberInput = (input, index) => {
        let errorValid = [...errorInput];
        if (isNaN(input)) {
            errorValid[index] = 'Incorrect entry.';
        } else {
            errorValid[index] = '';
        }
        setErrorInput(errorValid);
    };

    const autoFinish = () => {
        let newListPlayer = [...listPlayer];
        let filterList = newListPlayer.filter((x) => x.score !== '');

        if (
            filterList.length === newListPlayer.length - 1 &&
            !errorInput.some((x) => x.length > 0)
        ) {
            let sum = 0;
            newListPlayer.forEach((x) => {
                sum += Number(x.score);
            });

            newListPlayer.forEach((x) => {
                if (x.score === '') {
                    x.score = -sum;
                    return;
                }
            });
            setListPlayer(newListPlayer);
            setCanSubmit(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onClickSubmit(listPlayer);
        handleClose();
    };

    return (
        <div>
            <Modal open={props.status} disablebackdropclick='true'>
                <Box sx={style} className='responsive-width'>
                    <div>
                        <form onSubmit={handleSubmit}>
                            {listPlayer.map((player, index) => {
                                return (
                                    <div key={`editScore-${index}`}>
                                        <TextField
                                            className='responsive-width'
                                            label={player.name}
                                            sx={{
                                                marginBottom: '10px',
                                            }}
                                            value={player.score}
                                            error={
                                                errorInput[index].length === 0
                                                    ? false
                                                    : true
                                            }
                                            helperText={errorInput[index]}
                                            onChange={(e) => {
                                                let newListPlayer = [
                                                    ...listPlayer,
                                                ];
                                                let newPlayer = {
                                                    name: player.name,
                                                    score: e.target.value,
                                                };
                                                newListPlayer[index] =
                                                    newPlayer;
                                                setListPlayer(newListPlayer);
                                                validateNumberInput(
                                                    e.target.value,
                                                    index
                                                );
                                                setCanSubmit(() =>
                                                    checkSum(newListPlayer)
                                                );
                                            }}
                                            onBlur={() => {
                                                autoFinish();
                                            }}
                                        />
                                    </div>
                                );
                            })}
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 2, md: 4 }}
                                justifyContent='center'
                                alignItems='center'
                            >
                                <IconButton
                                    aria-label='add'
                                    color='success'
                                    type='submit'
                                    disabled={!canSubmit}
                                >
                                    <CheckOutlinedIcon />
                                </IconButton>
                                <IconButton
                                    aria-label='delete'
                                    color='error'
                                    onClick={() => {
                                        handleClose();
                                    }}
                                >
                                    <CancelOutlinedIcon />
                                </IconButton>
                            </Stack>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
