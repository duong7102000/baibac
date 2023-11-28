import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Stack from '@mui/system/Stack';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddPlayerModal(props) {
    const [playerInput, setPlayerInput] = React.useState('');
    const [errorValid, setErrorValid] = React.useState('');

    const handleClose = () => {
        props.callBack(false);
        setPlayerInput('');
        setErrorValid('');
    };

    const addPlayer = (player) => {
        props.addPlayer(player);
    };

    const validateName = (input) => {
        const listPlayer = JSON.parse(localStorage.getItem('listPlayer')) || [];
        if (
            listPlayer.length === 0 ||
            !listPlayer.some((x) => x.name === input)
        ) {
            setErrorValid('');
            return;
        } else {
            if (listPlayer.some((x) => x.name === input)) {
                setErrorValid('Player already exist');
                return;
            }
        }
    };

    const handleSubmit = (e) => {        
        e.preventDefault();        
        addPlayer(playerInput);
        handleClose();
    };

    return (
        <div>
            <Modal open={props.status} onClose={handleClose}>
                <Box sx={style} className='responsive-width'>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            className='responsive-width'
                            required
                            id='outlined-required'
                            label='Con nghiện mới'
                            sx={{ marginBottom: '10px' }}
                            value={playerInput}
                            onChange={(e) => {
                                setPlayerInput(e.target.value);
                                validateName(e.target.value);
                            }}
                            error={errorValid.length === 0 ? false : true}
                            helperText={errorValid}
                        />
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
                                onClick={handleSubmit}
                                disabled={
                                    playerInput.length !== 0 &&
                                    errorValid.length === 0
                                        ? false
                                        : true
                                }
                            >
                                <AddCircleOutlineOutlinedIcon />
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
                </Box>
            </Modal>
        </div>
    );
}
