import * as React from 'react';
import Box from '@mui/material/Box';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: '70%',
    maxHeight: '100%',
    display: 'flex',
    overflow: 'auto',
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(no, listPlayer) {
    let newRow = { No: no };
    listPlayer.forEach((e) => {
        let name = e.name;
        let score = e.score;
        newRow[name] = score;
    });
    return newRow;
}

function createColumns(listPlayer = []) {
    let columns = [
        {
            width: 20,
            label: 'No',
            id: 'No',
        },
    ];
    let addColumn = [];
    listPlayer.forEach((x) => {
        let newColumn = { minWidth: 5 };
        newColumn['label'] = x.name;
        newColumn['id'] = x.name;
        addColumn.push(newColumn);
    });
    addColumn.sort((a, b) => {
        return a.id.localeCompare(b.id);
    });
    columns = [...columns, ...addColumn];
    return columns;
}

function rows(history) {
    return history.map((item, index) => {
        return createData(index, item);
    });
}

export default function HistoryModal(props) {
    return (
        <div>
            <Modal open={props.status} onClose={props.callBack}>
                <Box sx={style} className='responsive-width'>
                    <Paper sx={{ overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: '100%' }}>
                            <Table stickyHeader aria-label='sticky table'>
                                <TableHead>
                                    <TableRow>
                                        {createColumns(
                                            props.history[
                                                props.history.length - 1
                                            ]
                                        ).map((column) => (
                                            <StyledTableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{
                                                    minWidth: column.minWidth,
                                                    width: column.width,
                                                }}
                                            >
                                                {column.label}
                                            </StyledTableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows(props.history).map((row, index) => {
                                        return (
                                            <StyledTableRow
                                                hover
                                                role='checkbox'
                                                tabIndex={-1}
                                                key={`row-history-${index}`}
                                            >
                                                {createColumns(
                                                    props.history[
                                                        props.history.length - 1
                                                    ]
                                                ).map((column) => {
                                                    const value =
                                                        row[column.id];
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                        >
                                                            {column.format &&
                                                            typeof value ===
                                                                'number'
                                                                ? column.format(
                                                                      value
                                                                  )
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </StyledTableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </Modal>
        </div>
    );
}
